import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import {
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
} from '../../../utilities/hooks/ModalPaymentContext';
import { useTranslation } from 'react-i18next';
import ReactPixel from 'react-facebook-pixel';
import MegaGamProgressBar from '../../MerchantsPage/gam/MegaGamListItem/MegaGamProgressBar';
import type { Campaign } from '../../../utilities/api/types';
import styled from 'styled-components';

export interface Props {
  sellerId: string;
  sellerName: string;
  costPerMeal: number;
  campaign?: Campaign;
}

export const Modal = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useModalPaymentDispatch(null);

  // set initial number of meals to 1
  const [numberOfMeals, setNumberOfMeals] = useState(1);
  const totalMealPrice = (numberOfMeals * props.costPerMeal) / 100;
  const donationAmount = {
    value: totalMealPrice,
    text: '$' + totalMealPrice,
  };

  const MAX_MEALS = 1000; // TODO: confirm max number of meals that a user can donate to prevent a really large number from rendering
  const COST_LIMIT = 10000;

  useEffect(() => {
    dispatch({
      type: ModalPaymentConstants.SET_AMOUNT,
      payload: {
        amount: String(totalMealPrice),
        matchAmount: String(matchAmount),
      },
    });
    // eslint-disable-next-line
  }, []);

  const handleMealAmount = (value: string) => {
    const valueInt = Math.min(MAX_MEALS, parseInt(value));
    setNumberOfMeals(isNaN(valueInt) ? 0 : valueInt);
    const totalMealPrice = (valueInt * props.costPerMeal) / 100;

    dispatch({
      type: ModalPaymentConstants.SET_AMOUNT,
      payload: {
        amount: String(totalMealPrice),
        matchAmount: String(matchAmount),
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
        donationAmount.value
      )
    : 0;

  const totalContribution = matchAmount + donationAmount.value;

  return (
    <MegaGamContainer
      data-testid="ModalMegaGam"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Header>{t('purchase.mega_gam')}</Header>
      <SubHeader>{t('paymentProcessing.amount.mega_gam')}</SubHeader>
      <MegaGamProgressBar
        endDate={props.campaign?.end_date || ''}
        isActive={props.campaign?.active || false}
        targetAmount={props.campaign?.target_amount || 0}
        totalRaised={props.campaign?.amount_raised || 0}
        isModal={true}
      />

      <AmountContainer>
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
              {'$' + props.costPerMeal / 100}
            </button>
          </div>
          <label className={styles.total}>
            {t('buyMeal.totalLabel')} <b>{'$' + donationAmount.value}</b>
          </label>
        </div>
        <br />
      </AmountContainer>
      {/* TODO (billy-yuan): Confirm whether this section will render if the donation match equals $0 */}
      <hr />
      <FeesAndOther>
        <b>{t('paymentProcessing.amount.donation_match')}</b>
        <b>
          <span>{'$' + matchAmount}</span>
        </b>
      </FeesAndOther>
      <hr />
      {/* TODO (billy-yuan): Confirm whether Mega Gam campaigns in the future will also do donation matching */}
      <TotalContainer>
        <div>
          {t('paymentProcessing.amount.donation_total')}:{' '}
          <span>{'$' + donationAmount.value}</span> <br />
          {matchAmount > 0 &&
            t('paymentProcessing.amount.total_donation_plus_match') + ':'}
          <span>{matchAmount > 0 && '$' + totalContribution}</span>
        </div>
      </TotalContainer>

      <NextButton
        type="button"
        className={'modalButton--filled'}
        onClick={openModal}
        disabled={
          numberOfMeals < 1 || numberOfMeals > COST_LIMIT / props.costPerMeal
        }
      >
        {t('paymentProcessing.amount.submit')}
      </NextButton>
    </MegaGamContainer>
  );
};

export default Modal;

const MegaGamContainer = styled.form``;

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
  padding: 25px 35px;
  margin-top: 40px;
  margin-bottom: 55px;
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
  margin-bottom: 50px;
`;

const FeesAndOther = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: space-between;
  span {
    color: #dd678a;
  }
`;
