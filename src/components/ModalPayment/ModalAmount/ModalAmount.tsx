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

export interface Props {
  sellerId: string;
  sellerName: string;
}

export const Modal = (props: Props) => {
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

  const buttonAmounts = ['10', '25', '50', '100'];

  const purchaseIsDonation =
    modalView === ModalPaymentTypes.modalPages.donation;

  const headerText = purchaseIsDonation
    ? t('purchase.donation', { seller: props.sellerName })
    : t('purchase.voucher', { seller: props.sellerName });

  return (
    <ContentContainer id="donation-form" data-testid="modal-amount">
      <Header>{headerText}</Header>

      {props.sellerId === 'send-chinatown-love' && (
        <p>{t('donationPool.description2')}</p>
      )}
      <p>{t('paymentProcessing.amount.body1')}</p>
      <p>{t('paymentProcessing.amount.body2')}</p>

      <AmountContainer>
        <label htmlFor="select-amount">
          {t('paymentProcessing.amount.label1')}
        </label>
        <br />
        <SelectAmtContainer>
          {buttonAmounts.map((amount) => (
            <button
              key={`$${amount}`}
              type="button"
              className={
                selectedAmount === `$${amount}`
                  ? 'modalButton--selected'
                  : 'modalButton--outlined'
              }
              onClick={(e) => {
                handleSelectAmount(amount, false, `$${amount}`);
              }}
            >
              {`$${amount}`}
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
            {purchaseIsDonation ? 'donation' : 'voucher'}{' '}
            {t('paymentProcessing.amount.amount')}: $5
          </ErrorMessage>
        )}
        {Number(amount) > CUSTOM_AMOUNT_MAX && isCustomAmount && (
          <ErrorMessage>
            {t('paymentProcessing.amount.maximum')}{' '}
            {purchaseIsDonation ? 'donation' : 'voucher'}{' '}
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
                  <Help style={{ color: '#A6192E' }} />
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

      <NextButton
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
      </NextButton>
    </ContentContainer>
  );
};

export default Modal;

const ContentContainer = styled.form`
  height: 360px;
`;

const AmountContainer = styled.div`
  background-color: #f7f7f7;
  padding: 25px 35px;
  margin-top: 30px;
`;

const SelectAmtContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 15px 0px;
`;

const CustomAmountContainer = styled.div`
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

const NextButton = styled.button`
  position: relative;
  float: right;
  right: 0px;
  bottom: -25px;
`;

const Header = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 30px;
  font-weight: 600;
`;
