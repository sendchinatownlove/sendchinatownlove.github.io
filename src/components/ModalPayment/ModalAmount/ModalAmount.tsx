import React, { useState } from 'react';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
} from '../../../utilities/hooks/ModalPaymentContext';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ReactPixel from 'react-facebook-pixel';

import { LIGHT_UP_CHINATOWN_TIER_1_LIMIT } from '../consts';

import LanternForm from './LanternForm';

export interface Props {
  sellerId: string;
  sellerName: string;
}

export const Modal = (props: Props) => {
  const { t } = useTranslation();

  const { amount, modalView } = useModalPaymentState(null);
  const dispatch = useModalPaymentDispatch(null);
  const [isCustomAmount, setIsCustomAmount] = useState(true);
  const [selected, setSelected] = useState('');
  const minAmount = 5;
  const maxAmount = 10000;

  const handleAmount = (value: string, customAmount: boolean, text: string) => {
    setSelected(text);
    setIsCustomAmount(customAmount);
    dispatch({ type: ModalPaymentConstants.SET_AMOUNT, payload: value });
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

  const purchaseIsDonation =
    modalView === ModalPaymentTypes.modalPages.donation;

  const getHeaderText = (purchaseType, sellerName) => {
    switch (purchaseType) {
      case ModalPaymentTypes.modalPages.donation:
        return t('purchase.donation', { seller: sellerName });
      case ModalPaymentTypes.modalPages.gift_card:
        return t('purchase.voucher', { seller: sellerName });
      case ModalPaymentTypes.modalPages.light_up_chinatown:
        return t('purchase.donation_to', { seller: sellerName });
      default:
        return t('purchase.donation', { seller: sellerName });
    }
  };

  return (
    <ContentContainer id="donation-form" data-testid="modal-amount">
      <Header>{getHeaderText(modalView, props.sellerName)}</Header>

      {props.sellerId === 'send-chinatown-love' && (
        <p>{t('donationPool.description2')}</p>
      )}
      <p>
        {t(
          `paymentProcessing.amount.${
            modalView === ModalPaymentTypes.modalPages.light_up_chinatown
              ? 'light_up_chinatown'
              : 'header'
          }`
        )}
      </p>

      <AmountContainer>
        <label htmlFor="select-amount">
          {t('paymentProcessing.amount.label1')}
        </label>
        <br />
        <SelectAmtContainer>
          {buttonAmounts.map((amount) => (
            <button
              key={amount.text}
              type="button"
              className={
                selected === amount.text
                  ? 'modalButton--selected'
                  : 'modalButton--outlined'
              }
              onClick={(e) => {
                handleAmount(amount.value, false, amount.text);
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
            onFocus={(e) => handleAmount('', true, '')}
            className={'modalInput--input'}
            onChange={(e) => {
              handleAmount(e.target.value, true, '');
            }}
            onKeyDown={(evt) =>
              (evt.key === 'e' ||
                evt.key === '+' ||
                evt.key === '-' ||
                evt.key === '.') &&
              evt.preventDefault()
            }
            value={isCustomAmount ? amount : ''}
            min="5"
            max="10000"
          />
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
      {modalView === ModalPaymentTypes.modalPages.light_up_chinatown &&
        amount >= LIGHT_UP_CHINATOWN_TIER_1_LIMIT && <LanternForm />}
      <NextButton
        type="button"
        className={'modalButton--filled'}
        onClick={openModal}
        disabled={
          Number(amount) < minAmount ||
          Number(amount) > maxAmount ||
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
