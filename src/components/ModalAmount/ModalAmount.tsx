import React, { useState } from 'react';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
} from '../../utilities/hooks/ModalPaymentContext/context';
import {
  SET_MODAL_VIEW,
  SET_AMOUNT,
} from '../../utilities/hooks/ModalPaymentContext/constants';
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
  const [isCustomAmount, setIsCustomAmount] = useState(true);
  const [selected, setSelected] = useState('');
  const dispatch = useModalPaymentDispatch();
  const minAmount = 5;
  const maxAmount = 10000;

  const handleAmount = (value: string, customAmount: boolean, text: string) => {
    setSelected(text);
    setIsCustomAmount(customAmount);
    dispatch({ type: SET_AMOUNT, payload: value });
  };

  const openModal = (e: any) => {
    ReactPixel.trackCustom('PaymentNextButtonClick', { amount: amount });
    e.preventDefault();
    dispatch({ type: SET_MODAL_VIEW, payload: 1 });
  };

  const validAmount = (value: string) => {
    const r = /^[0-9]+$/;
    return r.test(value);
  };

  const buttonAmounts = [
    { value: '10', text: '$10' },
    { value: '25', text: '$25' },
    { value: '50', text: '$50' },
    { value: '100', text: '$100' },
  ];

  const headerText =
    props.purchaseType === 'donation'
      ? t('purchase.donation')
      : t('purchase.voucher');

  return (
    <ContentContainer id="donation-form" data-testid="Modal Amount">
      <Header>
        {headerText} {props.sellerName}
      </Header>

      {props.sellerId === 'send-chinatown-love' && (
        <p>{t('donationPool.description2')}</p>
      )}
      <p>{t('paymentProcessing.amount.header')}</p>

      <AmountContainer>
        <label htmlFor="select-amount">
          {t('paymentProcessing.amount.label1')}
        </label>
        <br />
        <SelectAmtContainer>
          {buttonAmounts.map((amount) => (
            <button
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
            {props.purchaseType === 'gift_card' ? 'voucher' : 'donation'}{' '}
            {t('paymentProcessing.amount.amount')}: $5
          </ErrorMessage>
        )}
        {Number(amount) > maxAmount && isCustomAmount && (
          <ErrorMessage>
            {t('paymentProcessing.amount.maximum')}{' '}
            {props.purchaseType === 'gift_card' ? 'voucher' : 'donation'}{' '}
            {t('paymentProcessing.amount.amount')}: $10000
          </ErrorMessage>
        )}
      </AmountContainer>

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
  font-size: 32px;
  font-weight: 600;
`;
