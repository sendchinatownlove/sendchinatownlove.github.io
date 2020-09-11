import React, { useState, useEffect } from 'react';
import { useModalPaymentState, useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import {
  SET_MODAL_VIEW,
  SET_AMOUNT,
  SET_CUSTOM_INPUT,
  SET_COVERED_BY_CUSTOMER,
  TRANSACTION_FEE_PERCENT
} from '../../utilities/hooks/ModalPaymentContext/constants';
import { Checkbox } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ReactPixel from 'react-facebook-pixel';

export interface Props {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
}

export const Modal = (props: Props) => {
  const DEFAULT_AMOUNT = '25';
  const CUSTOM_AMOUNT_MIN = 5;
  const CUSTOM_AMOUNT_MAX = 10000;

  const { t } = useTranslation();
  const dispatch = useModalPaymentDispatch();
  const { amount, customInput, coveredByCustomer } = useModalPaymentState();
  const [selectedAmount, setSelectedAmount] = useState(DEFAULT_AMOUNT);
  const [coveredAmount, setCoveredAmount] = useState((Number(DEFAULT_AMOUNT) * TRANSACTION_FEE_PERCENT).toFixed(2));

  useEffect(() => {
    const newAmount = coveredByCustomer ? (Number(selectedAmount) + Number(coveredAmount)).toFixed(2) : selectedAmount;
    setAmount(newAmount);
  }, [selectedAmount, coveredAmount, coveredByCustomer]);

  const setAmount = (value: string) => dispatch({ type: SET_AMOUNT, payload: value });;
  const setCustomInput = (value: boolean) => dispatch({ type: SET_CUSTOM_INPUT, payload: value });
  const setCoveredByCustomer = (value: boolean) => dispatch({ type: SET_COVERED_BY_CUSTOMER, payload: value });

  const handleSelectAmount = (value: string) => {
    setCustomInput(false);
    setSelectedAmount(value);
    setCoveredAmount(transactionFee(value));
  };

  const handleSelectOther = (value: string) => {
    setCustomInput(true);
    setSelectedAmount(value);
    setCoveredAmount(transactionFee(value));
  };

  const handleToggleCoverFee = () => {
    setCoveredByCustomer(!coveredByCustomer);
  };

  const openModal = (e: any) => {
    ReactPixel.trackCustom('PaymentNextButtonClick', { amount: amount });
    e.preventDefault();
    dispatch({ type: SET_MODAL_VIEW, payload: 1 });
  };

  const transactionFee = (value: string) => {
    return (Number(value) * TRANSACTION_FEE_PERCENT).toFixed(2);
  };

  const formatCurrency = (value: string) => {
    return `$${ Number(value).toFixed(2) }`;
  };

  const validAmount = (value: string) => {
    const r = /^[0-9.]+$/;
    return r.test(value);
  };

  const buttonAmounts = ['10', '25', '50', '100'];

  const headerText =
    props.purchaseType === 'donation'
      ? `${ t('paymentProcessing.amount.donation.header') } ${ props.sellerName }`
      : `${ t('paymentProcessing.amount.voucher.header') } ${ props.sellerName }`;

  const bodyText =
    props.purchaseType === 'donation'
      ? t('paymentProcessing.amount.donation.body')
      : t('paymentProcessing.amount.voucher.body');

  return (
    <ContentContainer id="donation-form" data-testid="Modal Amount">
      <Header>
        { headerText }
      </Header>
      {
        props.sellerId === 'send-chinatown-love' &&
        <p>{ t('donationPool.description2') }</p>
      }
      <p>{ bodyText }</p>

      <AmountContainer>
        <label htmlFor="select-amount">
          { t('paymentProcessing.amount.label1') }
        </label>
        <br />
        <SelectAmountContainer>
          {
            buttonAmounts.map((buttonAmount) => (
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
            ))
          }
        </SelectAmountContainer>
        <label htmlFor="custom-amount">
          { t('paymentProcessing.amount.label2') }
        </label>
        <br />
        <CustomAmountContainer>
          <CustomAmountInput
            name="custom-amount"
            type="number"
            onFocus={ (e) => handleSelectOther('') }
            className={ 'modalInput--input' }
            onChange={ (e) => handleSelectOther(e.target.value) }
            onKeyDown={ (evt) =>
              (evt.key === 'e' ||
                evt.key === '+' ||
                evt.key === '-' ||
                evt.key === '.') &&
              evt.preventDefault()
            }
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
      </AmountContainer>

      <DisclaimerText>{ t('paymentProcessing.amount.cover.body1') }</DisclaimerText>
      <DisclaimerText>{ t('paymentProcessing.amount.cover.body2') }</DisclaimerText>

      <hr />
      <CoverFeeContainer>
        <CheckboxContainer>
          <Checkbox
            value="coveredByCustomer"
            inputProps={ { 'aria-label': 'Checkbox A' } }
            onClick={ handleToggleCoverFee }
            checked={ coveredByCustomer }
          />
          <b>{ t('paymentProcessing.amount.cover.action') }</b>
        </CheckboxContainer>
        <b>{ formatCurrency(coveredAmount) }</b>
      </CoverFeeContainer>
      <hr />

      <TotalContainer>
        <b>{ t('paymentProcessing.amount.total') }: <span>{ formatCurrency(amount) }</span></b>
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

const DisclaimerText = styled.p`
  font-size: 14px;
  line-height: 22px;
`;

const CoverFeeContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
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
