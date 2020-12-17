import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import {
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
  useModalPaymentState,
} from '../../../utilities/hooks/ModalPaymentContext';
import { useTranslation, Trans } from 'react-i18next';
import ReactPixel from 'react-facebook-pixel';
import CampaignProgressBar from '../../MerchantsPage/gam/CampaignProgressBar';
import { SIZE_TYPE } from '../../MerchantsPage/gam/ProgressBar';
import styled from 'styled-components';
import { formatCurrency } from '../../../utilities/general/textFormatter';
import { calculateFeeAmount } from '../../../utilities/general/feeCalculator';
import FiscalSponsor from '../../MerchantsPage/gam/FiscalSponsor';
import { Tooltip } from '@material-ui/core';
import { Help } from '@material-ui/icons';
import { COST_LIMIT_DOLLARS } from '../../../consts';
import { phoneScreens } from '../../../utilities/general/responsive';
import { useEffect } from 'react';

export interface Props {
  sellerId: string;
  sellerName: string;
  costPerMealInDollars: number;
  nonProfitLocationId?: string;
}

export const Modal = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useModalPaymentDispatch(null);

  // set initial number of meals to 1
  const { fees, campaignState } = useModalPaymentState(null);
  const [numberOfMeals, setNumberOfMeals] = useState(1);

  // TODO (billy-yuan): Confirm whether mega-gam campaigns in the future will have donation matching.
  // If so, we need to add a flag such as isMatching in the back end to determine whether to calculate a matchAmount

  const calculateMatchAmount = (userDonationDollars: number) => {
    if (
      !campaignState &&
      !campaignState.target_amount
      // !isMatching
    ) {
      return 0;
    }

    let excess =
      campaignState.amount_raised / 100 +
      userDonationDollars -
      campaignState.target_amount / 100;

    return excess > 0
      ? Math.max(0, userDonationDollars - excess)
      : userDonationDollars;
  };

  const squareFee = fees[0];

  const donationAmountDollars = numberOfMeals * props.costPerMealInDollars;
  const matchAmount = calculateMatchAmount(donationAmountDollars);
  const totalContribution = matchAmount + donationAmountDollars;
  const feesAmount = squareFee
    ? calculateFeeAmount(donationAmountDollars * 100, squareFee)
    : 0;

  const calculateMaxMeals = () => {
    const mealFee = squareFee
      ? calculateFeeAmount(props.costPerMealInDollars * 100, squareFee)
      : 0;

    const costPerMealPlusFee = 100 * props.costPerMealInDollars + mealFee;

    return Math.floor((100 * COST_LIMIT_DOLLARS) / costPerMealPlusFee);
  };

  const updateFeesAndAmounts = (value: string) => {
    const MAX_MEALS = calculateMaxMeals();
    const numMeals = value ? Math.min(MAX_MEALS, parseInt(value)) : 0;
    setNumberOfMeals(numMeals);

    const donationAmountDollars = numMeals * props.costPerMealInDollars;

    const newFeesAmount = squareFee
      ? calculateFeeAmount(donationAmountDollars * 100, squareFee)
      : 0;

    const matchAmount = calculateMatchAmount(donationAmountDollars);

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

  useEffect(() => {
    updateFeesAndAmounts(String(numberOfMeals));
    // eslint-disable-next-line
  }, []);

  const handleMealAmount = (value: string) => {
    updateFeesAndAmounts(value);
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

  const subHeaderText = () => {
    const makeSubHeaderText = (
      amountRaisedCents: number,
      targetAmountCents: number
    ) => {
      if (amountRaisedCents >= targetAmountCents) {
        return t('megaGam.description.targetMet');
      }
      return (
        <Trans
          i18nKey="megaGam.description.targetNotMet"
          values={{
            targetAmount: formatCurrency(targetAmountCents, 0),
          }}
        ></Trans>
      );
    };

    return (
      <span>
        {t('megaGam.description.body')}
        <br />
        <br />
        {makeSubHeaderText(
          campaignState.amount_raised,
          campaignState.target_amount
        )}
      </span>
    );
  };

  return (
    <MegaGamContainer
      data-testid="ModalMegaGam"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Header>{campaignState.display_name}</Header>
      <SubHeader>{subHeaderText()}</SubHeader>
      {campaignState.id && (
        <CampaignProgressBar
          endDate={campaignState.end_date}
          isActive={campaignState.active}
          pricePerMealInCents={campaignState.price_per_meal}
          size={SIZE_TYPE.SMALL}
          targetAmountInCents={campaignState.target_amount}
          totalRaisedInCents={campaignState.amount_raised}
        />
      )}

      <AmountContainer>
        <MealContainer>
          {/* <label htmlFor="select-amount">{t('buyMeal.prompt')}</label> */}
          <Label>{t('buyMeal.prompt')}</Label>
          <br />
          <SelectMealModule>
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
                  {'$' + props.costPerMealInDollars}
                </button>
              </div>
              <label className={styles.total}>
                {t('buyMeal.totalLabel')}{' '}
                <b>{formatCurrency(donationAmountDollars * 100, 0)}</b>
              </label>
            </div>
          </SelectMealModule>
          <FiscalSponsorContainer>
            {campaignState.nonprofit_id && (
              <FiscalSponsor nonprofitId={campaignState.nonprofit_id} />
            )}
          </FiscalSponsorContainer>
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
          numberOfMeals > COST_LIMIT_DOLLARS / props.costPerMealInDollars
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
  margin-bottom: 40px;
`;

const AmountContainer = styled.div`
  background-color: #f7f7f7;
  padding: 35px 0px 1px 0px;
  margin-top: 40px;
  margin-bottom: 40px;
  @media (${phoneScreens}) {
    padding: 35px 0px 1px 0px;
  }
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

const FiscalSponsorContainer = styled.div`
  margin-top: 55px;
`;

const SelectMealModule = styled.div`
  margin: 0px 24px;
`;

const Label = styled.div`
  margin: 0px 24px;
  font-size: 15px;
  word-wrap: normal;
`;
