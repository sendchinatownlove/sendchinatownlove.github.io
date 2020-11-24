import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import {
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
  useModalPaymentState,
} from '../../../utilities/hooks/ModalPaymentContext';
import { useTranslation } from 'react-i18next';
import ReactPixel from 'react-facebook-pixel';
import CampaignProgressBar from '../../MerchantsPage/gam/CampaignProgressBar';
import type { Campaign } from '../../../utilities/api/types';
import { SIZE_TYPE } from '../../MerchantsPage/gam/ProgressBar';
import styled from 'styled-components';
import { formatCurrency } from '../../../utilities/general/textFormatter';
import { calculateFeeAmount } from '../../../utilities/general/feeCalculator';
import FiscalSponsor from '../../MerchantsPage/gam/FiscalSponsor';
import { Tooltip } from '@material-ui/core';
import { Help } from '@material-ui/icons';

export interface Props {
  sellerId: string;
  sellerName: string;
  costPerMeal: number;
  nonProfitLocationId?: string;
  projectId?: number;
  campaign?: Campaign;
}

export const Modal = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useModalPaymentDispatch(null);

  // set initial number of meals to 1
  const { feesAmount, fees } = useModalPaymentState(null);
  const [numberOfMeals, setNumberOfMeals] = useState(1);
  const donationAmountDollars = numberOfMeals * props.costPerMeal;

  const COST_LIMIT_DOLLARS = 10000;
  const calculateMatchAmount = (
    targetAmount: number,
    amountRaised: number,
    userDonation: number
  ) => {
    if (!targetAmount) return 0;

    let excess = amountRaised + userDonation - targetAmount;
    return excess > 0 ? Math.max(0, userDonation - excess) : userDonation;
  };
  // TODO (billy-yuan): Confirm whether mega-gam campaigns in the future will have donation matching.
  // If so, we need to add a flag such as isMatching to determine whether to calculate a matchAmount
  const matchAmount = props.campaign
    ? calculateMatchAmount(
        props.campaign.target_amount / 100,
        props.campaign.amount_raised / 100,
        donationAmountDollars
      )
    : 0;

  const totalContribution = matchAmount + donationAmountDollars;

  const squareFee = fees[0];

  useEffect(() => {
    const matchAmount = props.campaign
      ? calculateMatchAmount(
          props.campaign.target_amount / 100,
          props.campaign.amount_raised / 100,
          donationAmountDollars
        )
      : 0;
    const newFeesAmount = squareFee
      ? calculateFeeAmount(100 * props.costPerMeal * numberOfMeals, squareFee)
      : 0;

    dispatch({
      type: ModalPaymentConstants.SET_FEES_AMOUNT,
      payload: newFeesAmount,
    });

    dispatch({
      type: ModalPaymentConstants.SET_AMOUNT,
      payload: {
        amount: donationAmountDollars,
        matchAmount: matchAmount,
      },
    });
    // eslint-disable-next-line
  }, []);

  const handleMealAmount = (value: string) => {
    const costPerMealPlusFee =
      100 * props.costPerMeal +
      (squareFee ? calculateFeeAmount(props.costPerMeal * 100, squareFee) : 0);

    const MAX_MEALS = Math.floor(
      (100 * COST_LIMIT_DOLLARS) / costPerMealPlusFee
    );
    const numMeals = Math.min(MAX_MEALS, parseInt(value));
    setNumberOfMeals(isNaN(numMeals) ? 0 : numMeals);
    const donationAmountDollars = numMeals * props.costPerMeal;
    const newFeesAmount = squareFee
      ? calculateFeeAmount(donationAmountDollars * 100, squareFee)
      : 0;

    const matchAmount = props.campaign
      ? calculateMatchAmount(
          props.campaign.target_amount / 100,
          props.campaign.amount_raised / 100,
          donationAmountDollars
        )
      : 0;

    dispatch({
      type: ModalPaymentConstants.SET_FEES_AMOUNT,
      payload: newFeesAmount,
    });

    dispatch({
      type: ModalPaymentConstants.SET_AMOUNT,
      payload: {
        amount: donationAmountDollars,
        matchAmount: matchAmount,
      },
    });
  };

  const openModal = (e: any) => {
    ReactPixel.trackCustom('GiftMealPaymentNextButtonClick', {
      numberOfMeals: numberOfMeals,
    });
    e.preventDefault();
    dispatch({
      type: ModalPaymentConstants.SET_MODAL_VIEW,
      payload: ModalPaymentTypes.modalPages.card_details,
    });
  };

  return (
    <MegaGamContainer
      data-testid="ModalMegaGam"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Header>{t('purchase.mega_gam')}</Header>
      <SubHeader>{t('paymentProcessing.amount.mega_gam')}</SubHeader>
      {props.campaign && (
        <CampaignProgressBar
          endDate={props.campaign.end_date}
          isActive={props.campaign.active}
          pricePerMeal={props.campaign.price_per_meal}
          size={SIZE_TYPE.SMALL}
          targetAmount={props.campaign.target_amount}
          totalRaised={props.campaign.amount_raised}
        />
      )}

      <AmountContainer>
        <MealContainer>
          <label htmlFor="select-amount">{t('buyMeal.prompt')}</label>
          <br />
          <div className={styles.selectAmtContainer}>
            <div className={styles.selectAmt}>
              <input
                name="custom-amount"
                type="number"
                className={classnames(styles.customAmt, 'modalInput--input')}
                onChange={(e) => {
                  handleMealAmount(e.target.value);
                }}
                value={numberOfMeals === 0 ? '' : String(numberOfMeals)}
                placeholder={t('paymentProcessing.amount.num_meals')}
                min="1"
              />
              <span className={styles.separator}>✕</span>
              <button
                type="button"
                className={classnames(
                  styles.costPerMeal,
                  'modalButton--nonfunctional'
                )}
                disabled={true}
              >
                {'$' + props.costPerMeal}
              </button>
            </div>
            <label className={styles.total}>
              {t('buyMeal.totalLabel')} <b>{'$' + donationAmountDollars}</b>
            </label>
          </div>
          <br />
          {props.campaign?.nonprofit_id && (
            <FiscalSponsor nonprofitId={props.campaign.nonprofit_id} />
          )}
        </MealContainer>
      </AmountContainer>

      <FeesAndOtherContainer>
        <FeesAndOther>
          {' '}
          <b>{t('paymentProcessing.amount.your_donation')}</b>
          <span>{formatCurrency(donationAmountDollars * 100)}</span>
        </FeesAndOther>
        {matchAmount > 0 && (
          <>
            <FeesAndOther>
              <b>{t('paymentProcessing.amount.donation_match')}</b>
              <span>{formatCurrency(matchAmount * 100)}</span>
            </FeesAndOther>
          </>
        )}
        {squareFee && (
          <FeesAndOther>
            <span>
              <b>{'Credit card processing fees'}</b>
              <Tooltip
                title={t('paymentProcessing.amount.feesTooltip').toString()}
                placement="right"
              >
                <Help style={{ color: '#A6192E', fontSize: '1rem' }} />
              </Tooltip>
            </span>
            <span>{formatCurrency(feesAmount)}</span>
          </FeesAndOther>
        )}
      </FeesAndOtherContainer>
      {matchAmount > 0 && (
        <>
          <FeesAndOther>
            <b>{t('paymentProcessing.amount.total_donation_plus_match')}</b>
            <span>
              {matchAmount > 0 && formatCurrency(totalContribution * 100)}
            </span>
          </FeesAndOther>
          <Divider />
        </>
      )}

      {/* TODO (billy-yuan): Confirm whether Mega Gam campaigns in the future will also do donation matching */}
      <TotalContainer>
        <div>
          {t('paymentProcessing.amount.donation_total')}:{' '}
          <span>
            {formatCurrency(donationAmountDollars * 100 + feesAmount)}
          </span>{' '}
          <br />
        </div>
      </TotalContainer>

      <NextButton
        type="button"
        className={'modalButton--filled'}
        onClick={openModal}
        disabled={
          numberOfMeals < 1 ||
          numberOfMeals > COST_LIMIT_DOLLARS / props.costPerMeal
        }
      >
        {t('paymentProcessing.amount.submit')}
      </NextButton>
    </MegaGamContainer>
  );
};

export default Modal;

const MegaGamContainer = styled.form`
  height: 360px;
  max-width: 960px;
  margin: 0 auto;
`;

const Header = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 30px;
  font-weight: 600;
`;

const SubHeader = styled.p`
  margin-top: 16px;
  margin-bottom: 60px;
`;

const AmountContainer = styled.div`
  background-color: #f7f7f7;
  padding: 35px 35px 1px 35px;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const NextButton = styled.button`
  position: relative;
  float: right;
  right: 0px;
  bottom: -25px;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: right;
  font-weight: bold;
  line-height: 31px;
  span {
    color: #dd678a;
  }
  padding-top: 15px;
  margin-top: 25px 0px 40px 0px;
`;

const FeesAndOtherContainer = styled.div`
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
`;
const FeesAndOther = styled.div`
  margin: 10px 0px 10px 0px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  span {
    font-weight: 600px;
  }
`;

const Divider = styled.div`
  border-top: 1px solid #c4c4c4;
`;

const MealContainer = styled.div`
  margin-bottom: 30px;
`;
