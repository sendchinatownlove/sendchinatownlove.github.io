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

import { RowFormat, LabelText, InputText, Subheader } from '../styles';
import {LIGHT_UP_CHINATOWN_TIER_1_LIMIT} from '../consts';

export interface Props {
  sellerId: string;
  sellerName: string;
}

export const Modal = (props: Props) => {
  const { t } = useTranslation();

  const { amount, modalView, lucData } = useModalPaymentState(null);
  const [isCustomAmount, setIsCustomAmount] = useState(true);
  const [selected, setSelected] = useState('');
  const dispatch = useModalPaymentDispatch(null);
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

  const buttonAmountsArray = modalView === ModalPaymentTypes.modalPages.light_up_chinatown
    ? [25, 45, 150, 300]
    : [10, 25, 50, 100];
  
  const buttonAmounts = buttonAmountsArray.map(x => ({ value: x.toString(), text: '$' + x.toString()}));

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

  const handleOnChange = (e) => {
    e.preventDefault();
    dispatch({
      type: ModalPaymentConstants.SET_LUC_DATA,
      payload: {
        key: e.target.name,
        value: e.target.value,
      },
    });
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
      {amount >= LIGHT_UP_CHINATOWN_TIER_1_LIMIT && (
        <AmountContainer>
          <Subheader>{t('paymentProcessing.amount.adopt_lantern')}</Subheader>
          <label>{t('paymentProcessing.amount.tier_2_donation')}</label>
          <br />
          <br />
          <label>{t('paymentProcessing.amount.personalize')}</label>
          <br />
          <br />
          <SingleRowFormat>
            <RowFormat width="38%">
              <LabelText htmlFor="first_name">
                {t('paymentProcessing.amount.labels.first_name')}
              </LabelText>
              <InputText
                name="firstName"
                type="text"
                className="modalInput--input"
                onChange={handleOnChange}
                placeholder={t(
                  'paymentProcessing.amount.place_holder.first_name'
                )}
                value={lucData.firstName}
              />
            </RowFormat>
            <RowFormat width="20%" mobileWidth="30%">
              <LabelText htmlFor="middle_initial">
                {t('paymentProcessing.amount.labels.middle_initial')}
              </LabelText>
              <InputText
                name="middleInitial"
                type="text"
                className="modalInput--input"
                onChange={handleOnChange}
                placeholder={t(
                  'paymentProcessing.amount.place_holder.middle_initial'
                )}
                value={lucData.middleInitial}
              />
            </RowFormat>
            <RowFormat width="38%">
              <LabelText htmlFor="last_name">
                {t('paymentProcessing.amount.labels.last_name')}
              </LabelText>
              <InputText
                name="lastName"
                type="text"
                className="modalInput--input"
                onChange={handleOnChange}
                placeholder={t(
                  'paymentProcessing.amount.place_holder.last_name'
                )}
                value={lucData.lastName}
              />
            </RowFormat>
          </SingleRowFormat>
        </AmountContainer>
      )}
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

const SingleRowFormat = styled(RowFormat)`
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
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
