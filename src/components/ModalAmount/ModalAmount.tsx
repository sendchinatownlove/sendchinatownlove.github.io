import React, { useState } from 'react';
import { useModalPaymentState, useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import {
  SET_MODAL_VIEW,
  SET_AMOUNT,
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
  const { t } = useTranslation();
  const { amount } = useModalPaymentState();
  const [selected, setSelected] = useState('');
  const [isCustomAmount, setIsCustomAmount] = useState(true);
  const [customAmount, setCustomAmount] = useState('0.00'); // TODO
  const [isFeeCovered, setIsFeeCovered] = useState(false);
  const dispatch = useModalPaymentDispatch();
  const minAmount = 5;
  const maxAmount = 10000;

  const changeAmount = (value: string) => {
    dispatch({ type: SET_AMOUNT, payload: value });
  };

  const handleAmount = (value: string, customAmount: boolean, text: string) => {
    setSelected(text);
    setIsCustomAmount(customAmount);
    dispatch({ type: SET_AMOUNT, payload: value });
  };

  const handleClickSelectAmount = (value: string, text: string) => {
    setSelected(text);
    setIsCustomAmount(false);
    changeAmount(value);
  };

  const handleClickSelectOther = (value: string) => {
    setSelected('');
    setIsCustomAmount(true);
    changeAmount(value);
  };

  const handleClickCoverFee = () => {
    setIsFeeCovered(!isFeeCovered);

    if (isFeeCovered) {
      const covered = transactionFee(amount);
      dispatch({ type: SET_AMOUNT, payload: (amount + covered) });
    }
  };

  const openModal = (e: any) => {
    ReactPixel.trackCustom('PaymentNextButtonClick', { amount: amount });
    e.preventDefault();
    dispatch({ type: SET_MODAL_VIEW, payload: 1 });
  };

  const transactionFee = (value: string) => {
    return (Number(value) * TRANSACTION_FEE_PERCENT).toFixed(2);
  };

  const formatMoney = (value: string) => {
    return `$${ Number(value).toFixed(2) }`;
  };

  const validAmount = (value: string) => {
    const r = /^[0-9]+$/;
    return r.test(value);
  };

  const buttonAmounts = [
    { value: '10', text: '$10' },
    { value: '25', text: '$25' },
    { value: '50', text: '$50' },
    { value: '100', text: '$100' }
  ];

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
        <SelectAmtContainer>
          {
            buttonAmounts.map((amount) => (
              <button
                key={ amount.text }
                type="button"
                className={
                  selected === amount.text
                    ? 'modalButton--selected'
                    : 'modalButton--outlined'
                }
                onClick={ (e) => {
                  handleAmount(amount.value, false, amount.text);
                } }
              >
                { amount.text }
              </button>
            ))
          }
        </SelectAmtContainer>
        <label htmlFor="custom-amount">
          { t('paymentProcessing.amount.label2') }
        </label>
        <br />
        <CustomAmountContainer>
          <CustomAmountInput
            name="custom-amount"
            type="number"
            onFocus={ (e) => handleAmount('', true, '') }
            className={ 'modalInput--input' }
            onChange={ (e) => {
              handleAmount(e.target.value, true, '');
            } }
            onKeyDown={ (evt) =>
              (evt.key === 'e' ||
                evt.key === '+' ||
                evt.key === '-' ||
                evt.key === '.') &&
              evt.preventDefault()
            }
            value={ isCustomAmount ? amount : '' }
            min="5"
            max="10000"
          />
          {
            Number(amount) < minAmount && isCustomAmount && (
              <ErrorMessage>
                { t('paymentProcessing.amount.minimum') }{ ' ' }
                { props.purchaseType === 'gift_card' ? 'voucher' : 'donation' }{ ' ' }
                { t('paymentProcessing.amount.amount') }: $5
              </ErrorMessage>
            )
          }
          {
            Number(amount) > maxAmount && isCustomAmount && (
              <ErrorMessage>
                { t('paymentProcessing.amount.maximum') }{ ' ' }
                { props.purchaseType === 'gift_card' ? 'voucher' : 'donation' }{ ' ' }
                { t('paymentProcessing.amount.amount') }: $10000
              </ErrorMessage>
            )
          }
        </CustomAmountContainer>
      </AmountContainer>

      <DisclaimerText>{ t('paymentProcessing.amount.cover.body1') }</DisclaimerText>
      <DisclaimerText>{ t('paymentProcessing.amount.cover.body2') }</DisclaimerText>

      <hr />
      <CoverFeeContainer>
        <CheckboxContainer>
          <Checkbox
            value="isFeeCovered"
            inputProps={ { 'aria-label': 'Checkbox A' } }
            onClick={ handleClickCoverFee }
            checked={ isFeeCovered }
          />
          <b>{ t('paymentProcessing.amount.cover.action') }</b>
        </CheckboxContainer>
        <b>{ formatMoney(transactionFee(amount)) }</b>
      </CoverFeeContainer>
      <hr />

      <TotalContainer>
        <b>{ t('paymentProcessing.amount.total') }: <span>{ formatMoney(amount) }</span></b>
      </TotalContainer>

      <NextButton
        type="button"
        className={ 'modalButton--filled' }
        onClick={ openModal }
        disabled={
          Number(amount) < minAmount ||
          Number(amount) > maxAmount ||
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
