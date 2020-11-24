import React, { useState, useEffect } from 'react';
import { times } from 'lodash/fp';
import { Checkbox } from '@material-ui/core';
import { SquarePaymentForm } from 'react-square-payment-form';
import 'react-square-payment-form/lib/default.css';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import SquareCardForm from './SquareCardForm';
import SubmissionButton from './SubmissionButton';

import {
  SquareErrors,
  hasKey,
  LIGHT_UP_CHINATOWN_TIER_2_MIN,
} from '../../../consts';
import { modalPages } from '../../../utilities/hooks/ModalPaymentContext/types';

import {
  makeSquarePayment,
  SquareLineItems,
  Buyer,
} from '../../../utilities/api';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
} from '../../../utilities/hooks/ModalPaymentContext';

type Props = {
  sellerId: string;
  sellerName: string;
  costPerMeal: number;
  nonProfitLocationId?: string;
  campaignId?: string;
};

type ErrorMessage = {
  code: string;
  detail: string;
};

const ModalCardDetails = ({
  sellerId,
  sellerName,
  costPerMeal,
  nonProfitLocationId,
  campaignId,
}: Props) => {
  const idempotencyKey = uuid();
  const { t } = useTranslation();
  const { amount, purchaseType, lucData } = useModalPaymentState(null);
  const dispatch = useModalPaymentDispatch(null);

  const [isTermsChecked, setTermsChecked] = useState(false);
  const [isSubscriptionChecked, setSubscriptionChecked] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessages, setErrorsMessages] = useState<string[]>([]);
  const [canSubmit, setCanSubmit] = useState(false);

  let applicationId, locationId, projectId;

  if (
    purchaseType === ModalPaymentTypes.modalPages.buy_meal &&
    nonProfitLocationId === process.env.REACT_APP_THINK_CHINATOWN_LOCATION_ID
  ) {
    applicationId = process.env.REACT_APP_THINK_CHINATOWN_APPLICATION_ID ?? '';
    locationId = process.env.REACT_APP_THINK_CHINATOWN_LOCATION_ID ?? '';
  } else {
    applicationId = process.env.REACT_APP_SQUARE_APPLICATION_ID ?? '';
    locationId = process.env.REACT_APP_SQUARE_LOCATION_ID ?? '';
  }

  if (sellerId === 'light-up-chinatown') {
    sellerId = '';
    projectId = '1';
  }

  const checkTermsAgreement = () => setTermsChecked(!isTermsChecked);

  const checkSubscriptionAgreement = () =>
    setSubscriptionChecked(!isSubscriptionChecked);

  const numberOfMeals = Number(amount) / costPerMeal;
  const mealText = numberOfMeals > 1 ? 'meals' : 'meal';
  const numberOfMealsText =
    purchaseType === ModalPaymentTypes.modalPages.buy_meal
      ? `(${numberOfMeals} ${mealText})`
      : '';

  const cardNonceResponseReceived = (errors: any[], nonce: string) => {
    setErrorsMessages([]);
    const is_distribution =
      purchaseType === ModalPaymentTypes.modalPages.buy_meal;

    if (errors && errors.length > 0 && errors[0]) {
      setErrorsMessages(errors.map((error) => error.message));
      return;
    }

    const purchaseTypeToItemType = (purchaseType: string) => {
      switch (purchaseType) {
        case modalPages.light_up_chinatown:
          return modalPages.donation;
        default:
          return purchaseType;
      }
    };

    // 'buy_meal' is still represented as a gift card when calling the API
    const payment: SquareLineItems = is_distribution
      ? times(
          () => ({
            amount: Number(costPerMeal) * 100,
            currency: 'usd',
            item_type: 'gift_card',
            quantity: 1,
          }),
          numberOfMeals
        )
      : [
          {
            amount: Number(amount) * 100,
            currency: 'usd',
            item_type: purchaseTypeToItemType(purchaseType),
            quantity: 1,
          },
        ];

    const buyer: Buyer = {
      name,
      email,
      nonce,
      idempotency_key: idempotencyKey,
      is_subscribed: isSubscriptionChecked,
    };

    setCanSubmit(false);

    return makeSquarePayment(
      nonce,
      sellerId,
      payment,
      buyer,
      is_distribution,
      campaignId,
      projectId,
      projectId ? JSON.stringify(lucData) : null
    )
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: ModalPaymentConstants.SET_MODAL_VIEW,
            payload: ModalPaymentTypes.modalPages.confirmation,
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          let responseErrors: ErrorMessage[] = [];
          if (err.response.data.errors)
            responseErrors = err.response.data.errors;
          else if (err.response.data.message)
            responseErrors = [
              { code: 'GENERIC_DECLINE', detail: err.response.data.message },
            ];

          const newErrors =
            responseErrors.length > 0
              ? responseErrors.map((error: ErrorMessage) => {
                  if (hasKey(SquareErrors, error.code)) {
                    return SquareErrors[error.code];
                  } else {
                    return error.detail;
                  }
                })
              : [];
          setErrorsMessages(newErrors);
        }
      });
  };

  const purchaseTypeHeader = (purchaseType) => {
    switch (purchaseType) {
      case ModalPaymentTypes.modalPages.donation:
        return 'donation';
      case ModalPaymentTypes.modalPages.light_up_chinatown:
        return t(
          'modalPayment.modalCardDetails.header.light_up_chinatown_donation'
        );
      case ModalPaymentTypes.modalPages.gift_card:
        return `voucher purchase`;
      case ModalPaymentTypes.modalPages.buy_meal:
        return 'Gift a Meal purchase';
      case ModalPaymentTypes.modalPages.mega_gam:
        return 'Gift-a-Meal purchase'; // to do: get latest copy for mega gam
      default:
        return 'Donation';
    }
  };

  const purchaseTypeMessage = (purchaseType, amount) => {
    switch (purchaseType) {
      case ModalPaymentTypes.modalPages.donation:
        return t('modalPayment.modalCardDetails.message.donation');
      case ModalPaymentTypes.modalPages.light_up_chinatown:
        if (amount >= LIGHT_UP_CHINATOWN_TIER_2_MIN)
          return t(
            'modalPayment.modalCardDetails.message.light_up_chinatown_tier_2'
          );
        else return t('modalPayment.modalCardDetails.message.donation');
      case ModalPaymentTypes.modalPages.gift_card:
        return t('modalPayment.modalCardDetails.message.voucher');
      default:
        return t('modalPayment.modalCardDetails.message.donation');
    }
  };

  useEffect(() => {
    setCanSubmit(
      isTermsChecked &&
        name.length > 0 &&
        email.length > 0 &&
        ModalPaymentConstants.EMAIL_REGEX.test(email)
    );
  }, [isTermsChecked, name, email]);

  const setDisclaimerLanguage = (
    type: string | ModalPaymentTypes.modalPages
  ) => {
    if (sellerId === 'send-chinatown-love')
      type = ModalPaymentTypes.modalPages.donation_pool;

    switch (type) {
      case ModalPaymentTypes.modalPages.donation:
        return t(
          'modalPayment.modalCardDetails.disclaimer.donation',
          sellerName
        );
      case ModalPaymentTypes.modalPages.donation_pool:
        return t(
          'modalPayment.modalCardDetails.disclaimer.donation_pool',
          sellerName
        );
      case ModalPaymentTypes.modalPages.gift_card:
        return t(
          'modalPayment.modalCardDetails.disclaimer.gift_card',
          sellerName
        );
      case ModalPaymentTypes.modalPages.light_up_chinatown:
        return t('modalPayment.modalCardDetails.disclaimer.light_up_chinatown');
      case ModalPaymentTypes.modalPages.mega_gam:
        return t('modalPayment.modalCardDetails.disclaimer.mega_gam');
      default:
        break;
    }
  };

  const setDetailsText = (
    type: ModalPaymentTypes.modalPages,
    amount: number
  ) => {
    if (sellerId === 'send-chinatown-love')
      type = ModalPaymentTypes.modalPages.donation_pool;

    if (
      type === ModalPaymentTypes.modalPages.gift_card ||
      (type === ModalPaymentTypes.modalPages.light_up_chinatown &&
        amount >= LIGHT_UP_CHINATOWN_TIER_2_MIN)
    ) {
      return t('modalPayment.modalCardDetails.details.voucher');
    } else {
      return t('modalPayment.modalCardDetails.details.donation');
    }
  };

  return (
    <div>
      <Header>
        {t('modalPayment.modalCardDetails.header.completeYour')}{' '}
        {purchaseTypeHeader(purchaseType)}
      </Header>
      <p>{t('modalPayment.modalCardDetails.body.paymentInfo')}</p>

      <PaymentContainer>
        <Subheader>
          {t('modalPayment.modalCardDetails.header.paymentInfo')}
        </Subheader>
        <RowFormat>
          <LabelText htmlFor="name">
            {t('modalPayment.modalCardDetails.body.fullName')}
          </LabelText>
          <InputText
            name="name"
            type="text"
            className="modalInput--input"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder={t('modalPayment.modalCardDetails.placeholders.name')}
          />
          <LabelText htmlFor="email">
            {t('modalPayment.modalCardDetails.body.email')}
          </LabelText>
          <InputText
            name="email"
            type="email"
            className="modalInput--input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder={t('modalPayment.modalCardDetails.placeholders.email')}
            pattern={ModalPaymentConstants.EMAIL_REGEX.source}
            required
          />
        </RowFormat>
        <SquareFormContainer>
          <SquarePaymentForm
            sandbox={
              !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            }
            applicationId={applicationId}
            locationId={locationId}
            cardNonceResponseReceived={cardNonceResponseReceived}
            formId="SPF"
            apiWrapper=""
          >
            <SquareCardForm />
            <div className="sq-error-message">
              {errorMessages.map((errorMessage) => (
                <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
              ))}
            </div>
            <br />
            <Subheader>{setDetailsText(purchaseType, amount)}</Subheader>

            <span>
              {' '}
              {purchaseTypeMessage(purchaseType, amount)} of{' '}
              <b>
                ${amount} {numberOfMealsText}
              </b>{' '}
              {/* todo: For megagam, confirm which name to use in line below */}
              to {sellerName}{' '}
            </span>

            {lucData.firstName !== '' && (
              <span>
                <br />
                <br />
                {t('modalPayment.modalCardDetails.message.luc_name')}
                <BoldText>
                  {`${lucData.firstName} 
                  ${
                    lucData.middleInitial.length > 0
                      ? lucData.middleInitial.substring(0, 1).toUpperCase() +
                        '. '
                      : ''
                  } 
                  ${lucData.lastName}`}
                </BoldText>
              </span>
            )}
            {lucData.address !== '' && (
              <span>
                <br />
                <br />
                {t('modalPayment.modalCardDetails.message.luc_address')}
                <BoldText>{`${lucData.fullName}, ${lucData.address}, ${lucData.city}, ${lucData.state} ${lucData.zipCode}`}</BoldText>
              </span>
            )}
            <p />
            <CheckboxContainer>
              <Checkbox
                value="checkedA"
                inputProps={{ 'aria-label': 'Checkbox A' }}
                onClick={checkTermsAgreement}
                checked={isTermsChecked}
              />
              <span>
                I agree with the <b>Terms & Conditions</b>
              </span>
            </CheckboxContainer>
            <CheckboxContainer>
              <Checkbox
                value="checkedB"
                inputProps={{ 'aria-label': 'Checkbox B' }}
                onClick={checkSubscriptionAgreement}
                checked={isSubscriptionChecked}
              />
              <span>
                {t('modalPayment.modalCardDetails.body.emailUpdates')}
              </span>
            </CheckboxContainer>
            <Disclaimer>{setDisclaimerLanguage(purchaseType)}</Disclaimer>
            <ButtonRow>
              <BackButton
                type="button"
                className={'modalButton--back'}
                onClick={() =>
                  dispatch({
                    type: ModalPaymentConstants.SET_MODAL_VIEW,
                    payload: purchaseType,
                  })
                }
              >
                ᐸ Back
              </BackButton>
              <SubmissionButton canSubmit={canSubmit} />
            </ButtonRow>
          </SquarePaymentForm>
        </SquareFormContainer>
      </PaymentContainer>
    </div>
  );
};

export default ModalCardDetails;

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  div {
    width: 100%;
  }
`;

export const RowFormat = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  text-transform: uppercase;
`;

export const LabelText = styled.label`
  color: #373f4a;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

export const InputText = styled.input`
  font-size: 14px;
  color: #373f4a;
  border: 1px solid #dedede;
  margin: 5px 0 15px;
  padding: 27px 15px;
  width: 100%;
  border-radius: 5px;

  ::placeholder {
    color: #cdcdcd;
  }

  :invalid {
    color: #fa755a;
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;

  :hover {
    text-decoration: underline;
  }

  > span {
    padding: 9px 9px 9px 0px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const BackButton = styled.button`
  width: 75px;
  font-size: 13px;
  background-color: white;
`;

const SquareFormContainer = styled.div`
  h3,
  span,
  p {
    font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 15px;
  }

  h3 {
    font-size: 24px;
  }
`;

const Header = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 32px;
  font-weight: 600;
`;

const Subheader = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 18px;
`;

const Disclaimer = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: 300;
  padding: 0px 0px 0px 0px;
  margin: 30px 0px 30px 0px;
  opacity: 0.7;
`;
