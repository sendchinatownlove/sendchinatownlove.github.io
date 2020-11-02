import React, { useState, useEffect } from 'react';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes
} from '../../../utilities/hooks/ModalPaymentContext';
import {
  SET_MODAL_VIEW,
  SET_AMOUNT,
  SET_CUSTOM_INPUT
} from '../../utilities/hooks/ModalPaymentContext/constants';
import { formatCurrency } from '../../utilities/general/textFormatter';
import { getFees } from '../../utilities/api/interactionManager';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@material-ui/core';
import Help from '@material-ui/icons/Help';
import styled from 'styled-components';
import ReactPixel from 'react-facebook-pixel';

const validAmount = (value: string) => {
  const r = /^[0-9.]+$/;
  return r.test(value);
};

export interface Props {
  sellerId: string;
  sellerName: string;
  // TODO: add fees prop
}

export const Modal = (props: Props) => {
  const CUSTOM_AMOUNT_MIN = 5_00;
  const CUSTOM_AMOUNT_MAX = 10000_00;
  const DEFAULT_AMOUNT = CUSTOM_AMOUNT_MIN;

  const { t } = useTranslation();

  const { amount, customInput, modalView } = useModalPaymentState();

  const [selectedAmount, setSelectedAmount] = useState(amount);
  const [feesAmount, setFeesAmount] = useState('0');
  const [flat, setFlat] = useState(0);
  const [multiplier, setMultiplier] = useState(0);
  const [isCustomInput, setIsCustomInput] = useState(customInput);

  const dispatch = useModalPaymentDispatch();

  useEffect(() => {
    getFees('square')
      .then((res) => {
        const { fee } = res;

        if (fee) {
          setFlat(fee.flat);
          setMultiplier(fee.multiplier);
        }

        setFeesAmount(transactionFee(amount));
      });
  }, []);

  useEffect(() => {
    dispatch({ type: SET_AMOUNT, payload: selectedAmount });
  }, [selectedAmount, dispatch]);

  useEffect(() => {
    dispatch({ type: SET_CUSTOM_INPUT, payload: isCustomInput });
  }, [isCustomInput, dispatch]);

  const transactionFee = (amount: string) => {
    if (!validAmount(amount)) return '';

    return ((Number(amount) + flat) / (1 - multiplier)).toFixed(2);
  };

  const handleSelectAmount = (value: string) => {
    setIsCustomInput(false);
    setSelectedAmount(value);
    setFeesAmount(transactionFee(value));
  };

  const handleSelectCustom = (value: string) => {
    setIsCustomInput(true);
    setSelectedAmount(value);
    setFeesAmount(transactionFee(value));
  };

  const openModal = (e: any) => {
    ReactPixel.trackCustom('PaymentNextButtonClick', { amount: amount });
    e.preventDefault();
    dispatch({
      type: ModalPaymentConstants.SET_MODAL_VIEW,
      payload: ModalPaymentTypes.modalPages.card_details,
    });
  };

  const buttonAmounts = ['10', '25', '50', '100'];

  const purchaseIsDonation =
    modalView === ModalPaymentTypes.modalPages.donation;

  const headerText = purchaseIsDonation
    ? t('purchase.donation', { seller: props.sellerName })
    : t('purchase.voucher', { seller: props.sellerName });

  return (
    <ContentContainer id="donation-form" data-testid="Modal Amount">
      <Header>{headerText}</Header>
      {
        props.sellerId === 'send-chinatown-love' &&
        <p>{ t('donationPool.description2') }</p>
      }
      <p>{ t('paymentProcessing.amount.body1') }</p>
      <p>{ t('paymentProcessing.amount.body2') }</p>

      <AmountContainer>
        <label htmlFor="select-amount">
          { t('paymentProcessing.amount.label1') }
        </label>
        <br />
        <SelectAmountContainer>
          { buttonAmounts.map((buttonAmount) => (
            <button
              key={ buttonAmount }
              type="button"
              className={
                selectedAmount === buttonAmount
                  ? 'modalButton--selected'
                  : 'modalButton--outlined'
              }
              onClick={ (e) => handleSelectAmount(buttonAmount) }
            >
              { `$${ buttonAmount }` }
            </button>
          )) }
        </SelectAmountContainer>
        <label htmlFor="custom-amount">
          { t('paymentProcessing.amount.label2') }
        </label>
        <br />
        <CustomAmountContainer>
          <CustomAmountInput
            name="custom-amount"
            type="number"
            onFocus={ (e) => setIsCustomInput(true) }
            className={ 'modalInput--input' }
            onChange={ (e) => handleSelectCustom(e.target.value) }
            onKeyDown={ (e) => ['e', '+', '-', '.'].includes(e.key) && e.preventDefault() }
            value={ selectedAmount }
            min={ CUSTOM_AMOUNT_MIN }
            max={ CUSTOM_AMOUNT_MAX }
          />
          {
            customInput &&
            Number(amount) < CUSTOM_AMOUNT_MIN &&
            <ErrorMessage>
              {
                `${ t('paymentProcessing.amount.minimum') }
                ${ props.purchaseType === 'gift_card' ? 'voucher' : 'donation' }
                ${ t('paymentProcessing.amount.amount') }: $${ CUSTOM_AMOUNT_MIN }`
              }
            </ErrorMessage>
          }
          {
            customInput &&
            Number(amount) > CUSTOM_AMOUNT_MAX &&
            <ErrorMessage>
              {
                `${ t('paymentProcessing.amount.maximum') }
                ${ props.purchaseType === 'gift_card' ? 'voucher' : 'donation' }
                ${ t('paymentProcessing.amount.amount') }: $${ CUSTOM_AMOUNT_MAX }`
              }
            </ErrorMessage>
          }
        </CustomAmountContainer>
        {Number(amount) < minAmount && isCustomAmount && (
          <ErrorMessage>
            {t('paymentProcessing.amount.minimum')}{' '}
            {purchaseIsDonation ? 'donation' : 'voucher'}{' '}
            {t('paymentProcessing.amount.amount')}: $5
          </ErrorMessage>
        )}
        {Number(amount) > maxAmount && isCustomAmount && (
          <ErrorMessage>
            {t('paymentProcessing.amount.maximum')}{' '}
            {purchaseIsDonation ? 'donation' : 'voucher'}{' '}
            {t('paymentProcessing.amount.amount')}: $10000
          </ErrorMessage>
        )}
      </AmountContainer>

      <hr />

      <TransactionFeeContainer>
        <p>
          <b>{ t('paymentProcessing.amount.fees') }</b>
          <span>
            <Tooltip
              title={ t('paymentProcessing.amount.feesTooltip').toString() }
              placement="right"
            >
              <Help style={ { color: '#A6192E' } } />
            </Tooltip>
          </span>
        </p>
        <p><b>{ formatCurrency(Number(feesAmount)) }</b></p>
      </TransactionFeeContainer>

      <hr />

      <TotalContainer>
        <b>{ t('paymentProcessing.amount.total') }: <span>{ formatCurrency(Number(amount) * 100) }</span></b>
      </TotalContainer>

      <NextButton
        type="button"
        className={ 'modalButton--filled' }
        onClick={ openModal }
        disabled={
          Number(amount) < CUSTOM_AMOUNT_MIN ||
          Number(amount) > CUSTOM_AMOUNT_MAX ||
          !validAmount(amount)
        }
      >
        { t('paymentProcessing.amount.submit') }
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
  margin: 30px 0;
`;

const SelectAmountContainer = styled.div`
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

const TransactionFeeContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 13px;
    padding: 0;
  }
`;

const TotalContainer = styled.label`
  display: flex;
  justify-content: flex-end;
  span {
    color: #DD678A;
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
