import React, { useState, useEffect } from 'react';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
} from '../../../utilities/hooks/ModalPaymentContext';
import { formatCurrency } from '../../../utilities/general/textFormatter';
import { calculateFeeAmount } from '../../../utilities/general/feeCalculator';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@material-ui/core';
import Help from '@material-ui/icons/Help';
import styled from 'styled-components';
import ReactPixel from 'react-facebook-pixel';
import { SellerIds, SellerNames } from '../../../consts';

export interface Props {
  sellerId: string;
  sellerName: string;
}

export const ModalAmount = (props: Props) => {
  const { t } = useTranslation();

  const { amount, feesAmount, fees, modalView } = useModalPaymentState(null);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedFeesAmount, setSelectedFeesAmount] = useState(0);
  const [isCustomAmount, setIsCustomAmount] = useState(true);
  const dispatch = useModalPaymentDispatch(null);
  const CUSTOM_AMOUNT_MIN = 5;
  const CUSTOM_AMOUNT_MAX = 10000;
  const squareFee = fees[0]; // @TODO: allow for multiple fees; do not assume Square fee.

  useEffect(() => {
    dispatch({
      type: ModalPaymentConstants.SET_AMOUNT,
      payload: selectedAmount,
    });
  }, [selectedAmount, dispatch]);

  useEffect(() => {
    dispatch({
      type: ModalPaymentConstants.SET_FEES_AMOUNT,
      payload: selectedFeesAmount,
    });
  }, [selectedFeesAmount, dispatch]);

  const handleSelectAmount = (
    value: string,
    customAmount: boolean,
    text: string
  ) => {
    const newAmountInCents = Number(value) * 100;
    const newFeesAmount = squareFee
      ? calculateFeeAmount(newAmountInCents, squareFee)
      : 0;

    setSelectedAmount(value);
    setSelectedFeesAmount(newFeesAmount);
    setIsCustomAmount(customAmount);
  };

  const openModal = (e: any) => {
    ReactPixel.trackCustom('PaymentNextButtonClick', { amount: amount });
    e.preventDefault();
    dispatch({
      type: ModalPaymentConstants.SET_MODAL_VIEW,
      payload: ModalPaymentTypes.modalPages.card_details,
    });
  };

  const validAmount = (value: string) => {
    const r = /^[0-9]+$/;
    return r.test(value);
  };

  const buttonAmountsArray =
    modalView === ModalPaymentTypes.modalPages.light_up_chinatown
      ? [25, 45, 150, 300]
      : [10, 25, 50, 100];

  const buttonAmounts = buttonAmountsArray.map((x) => ({
    value: x.toString(),
    text: '$' + x.toString(),
  }));

  const getHeaderText = (purchaseType, sellerName) => {
    if (props.sellerName === SellerNames.APEX_FOR_YOUTH)
      return 'Gift-a-Meal Donation';

    switch (purchaseType) {
      case ModalPaymentTypes.modalPages.donation:
        if (sellerName === 'Apex for Youth') {
          return t('purchase.donationDefault');
        }
        return t('purchase.donation', { seller: sellerName });
      case ModalPaymentTypes.modalPages.gift_card:
        return t('purchase.voucher', { seller: sellerName });
      case ModalPaymentTypes.modalPages.light_up_chinatown:
        return t('purchase.donation_to', { seller: sellerName });
      default:
        return t('purchase.donation', { seller: sellerName });
    }
  };

  const getSubHeaderText = () => {
    if (modalView === ModalPaymentTypes.modalPages.light_up_chinatown) {
      return t('paymentProcessing.amount.light_up_chinatown');
    } else if (props.sellerId === SellerIds.APEX_FOR_YOUTH) {
      return t('donationPool.descriptionApex');
    } else {
      return t('paymentProcessing.amount.header');
    }
  };

  return (
    <ContentContainer id="donation-form" data-testid="modal-amount">
      <Header>{getHeaderText(modalView, props.sellerName)}</Header>

      {props.sellerId === SellerIds.SEND_CHINATOWN_LOVE && (
        <p>{t('donationPool.description2')}</p>
      )}
      <p>{getSubHeaderText()}</p>

      <AmountContainer>
        <label htmlFor="select-amount">
          {t('paymentProcessing.amount.label1')}
        </label>
        <br />
        <SelectAmtContainer>
          {buttonAmounts.map((amount) => (
            <button
              key={amount.value}
              type="button"
              className={
                selectedAmount === amount.value
                  ? 'modalButton--selected'
                  : 'modalButton--outlined'
              }
              onClick={(e) => {
                handleSelectAmount(amount.value, false, amount.text);
              }}
            >
              {amount.text}
            </button>
          ))}
        </SelectAmtContainer>
        <label htmlFor="custom-amount">
          {t('paymentProcessing.amount.label2')}
        </label>
        <br />
        <CustomAmountContainer>
          <CustomAmountInput
            name="custom-amount"
            type="number"
            onFocus={(e) => handleSelectAmount('', true, '')}
            className={'modalInput--input'}
            onChange={(e) => handleSelectAmount(e.target.value, true, '')}
            onKeyDown={(e) =>
              ['e', '+', '-', '.'].includes(e.key) && e.preventDefault()
            }
            value={isCustomAmount ? amount : ''}
            min="5"
            max="10000"
          />
        </CustomAmountContainer>
        {Number(amount) < CUSTOM_AMOUNT_MIN && isCustomAmount && (
          <ErrorMessage>
            {t('paymentProcessing.amount.minimum')}{' '}
            {t('paymentProcessing.amount.amount')}: $5
          </ErrorMessage>
        )}
        {Number(amount) > CUSTOM_AMOUNT_MAX && isCustomAmount && (
          <ErrorMessage>
            {t('paymentProcessing.amount.maximum')}{' '}
            {t('paymentProcessing.amount.amount')}: $10000
          </ErrorMessage>
        )}
      </AmountContainer>

      {squareFee && (
        <>
          <hr />
          <TransactionFeeContainer>
            <p>
              <b>{t('paymentProcessing.amount.fees')}</b>
              <span>
                <Tooltip
                  title={t('paymentProcessing.amount.feesTooltip').toString()}
                  placement="right"
                >
                  <Help style={{ color: '#A6192E', fontSize: '1rem' }} />
                </Tooltip>
              </span>
            </p>
            <p>
              <b>{formatCurrency(feesAmount)}</b>
            </p>
          </TransactionFeeContainer>
          <hr />
        </>
      )}

      <TotalContainer>
        <b>
          {t('paymentProcessing.amount.total')}:{' '}
          <span>{formatCurrency(Number(amount) * 100 + feesAmount)}</span>
        </b>
      </TotalContainer>
      <Footer>
        <ButtonContainer>
          <button
            type="button"
            className={'modalButton--filled'}
            onClick={openModal}
            disabled={
              Number(amount) < CUSTOM_AMOUNT_MIN ||
              Number(amount) > CUSTOM_AMOUNT_MAX ||
              !validAmount(amount)
            }
          >
            {t('paymentProcessing.amount.submit')}
          </button>
        </ButtonContainer>
        {modalView === ModalPaymentTypes.modalPages.donation && (
          <Disclaimer>{t('purchase.footer')}</Disclaimer>
        )}
      </Footer>
    </ContentContainer>
  );
};

export default ModalAmount;

const ContentContainer = styled.form`
  height: 360px;
  max-width: 960px;
  margin: 0 auto;
`;

const AmountContainer = styled.div`
  background-color: #f7f7f7;
  padding: 25px 35px;
  margin-top: 30px;
`;

const SelectAmtContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 15px 0px;
`;

export const CustomAmountContainer = styled.div`
  position: relative;
  display: inline;
  :before {
    content: '$';
    position: absolute;
    top: 0;
    left: 8px;
    z-index: 1;
  }
`;

const TransactionFeeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 13px;
    padding: 0;
  }
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
  span {
    color: #dd678a;
  }
`;

const CustomAmountInput = styled.input`
  width: 250px;
  border: 1px solid #121212;
  margin-top: 8px;
  padding-left: 2em;
  :invalid {
    border: 1px solid red;
  }
  @media (max-width: 450px) {
    width: 100%;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonContainer = styled.div`
  text-align: right;
  padding-top: 25px;
`;

const Disclaimer = styled.div`
  margin-top: 25px;
`;

const Header = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 30px;
  font-weight: 600;
`;
