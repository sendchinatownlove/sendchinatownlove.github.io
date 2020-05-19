import React, { useState } from 'react';
import { Checkbox } from '@material-ui/core';
import { SquarePaymentForm } from 'react-square-payment-form';
import 'react-square-payment-form/lib/default.css';
import SquareCardForm from './SquareCardForm';
import SubmissionButton from './SubmissionButton';
import { SquareErrors, hasKey } from '../../consts';
import {
  makeSquarePayment,
  SquarePaymentParams,
  Buyer,
} from '../../utilities/api';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
} from '../../utilities/hooks/ModalPaymentContext/context';
import {
  EMAIL_REGEX,
  SET_MODAL_VIEW,
} from '../../utilities/hooks/ModalPaymentContext/constants';

import styled from 'styled-components';

type Props = {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
  idempotencyKey: string;
  costPerMeal: number;
};

type ErrorMessage = {
  code: string;
  detail: string;
};

const SquareModal = ({
  purchaseType,
  sellerId,
  sellerName,
  idempotencyKey,
  costPerMeal,
}: Props) => {
  const { amount } = useModalPaymentState();
  const dispatch = useModalPaymentDispatch();

  const [isTermsChecked, setTermsChecked] = useState(false);
  const [isSubscriptionChecked, setSubscriptionChecked] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessages, setErrorsMessages] = useState<string[]>([]);

  const checkTermsAgreement = () => setTermsChecked(!isTermsChecked);
  const checkSubscriptionAgreement = () =>
    setSubscriptionChecked(!isSubscriptionChecked);

  const cardNonceResponseReceived = (errors: any[], nonce: string) => {
    setErrorsMessages([]);

    if (errors && errors.length > 0 && errors[0]) {
      setErrorsMessages(errors.map((error) => error.message));
      return;
    }

    // 'buy_meal' is still respresented as a gift card when calling the API
    const payment: SquarePaymentParams = {
      amount: Number(amount) * 100,
      currency: 'usd',
      item_type: purchaseType === 'buy_meal' ? 'gift_card' : purchaseType,
      quantity: 1,
    };

    const is_distribution = purchaseType === 'buy_meal';
    const buyer: Buyer = {
      name,
      email,
      nonce,
      idempotency_key: idempotencyKey,
      is_subscribed: isSubscriptionChecked,
    };

    return makeSquarePayment(nonce, sellerId, payment, buyer, is_distribution)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: SET_MODAL_VIEW, payload: 2 });
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

  const applicationId = process.env.REACT_APP_SQUARE_APPLICATION_ID
    ? process.env.REACT_APP_SQUARE_APPLICATION_ID
    : '';
  const locationId = process.env.REACT_APP_SQUARE_LOCATION_ID
    ? process.env.REACT_APP_SQUARE_LOCATION_ID
    : '';

  const purchaseTypePhrase = (shouldLowerCase) => {
    switch (purchaseType) {
      case 'donation':
        return shouldLowerCase ? 'donation' : 'Donation';
      case 'gift_card':
        return shouldLowerCase ? 'voucher purchase' : 'Voucher purchase';
      case 'buy_meal':
        return 'Gift a Meal purchase';
      default:
        return 'Donation';
    }
  };

  const numberOfMeals = Number(amount) / costPerMeal;
  const mealText = numberOfMeals > 1 ? 'meals' : 'meal';
  const numberOfMealsText =
    purchaseType === 'buy_meal' ? `(${numberOfMeals} ${mealText})` : '';

  const canSubmit =
    isTermsChecked &&
    name.length > 0 &&
    email.length > 0 &&
    EMAIL_REGEX.test(email);
  
  const disclaimerLanguage = (type: any) => {
    if (sellerId === 'send-chinatown-love') type = 'donation-pool';

    switch(type) {
      case 'donation':
        return `By proceeding with your transaction, you understand that you are
        making a donation to ${sellerName}. No goods or services were
        exchanged for this donation.`
      case 'donation-pool':
        return `By proceeding with your transaction, you understand that 
        you are making a donation to all merchants partnered with Send Chinatown Love 
        Inc. The full donation pool will be split among these merchants. No goods or 
        services were exchanged for this donation`
      case 'gift_card':
        return `By proceeding with your purchase, you understand that the voucher card 
        is not redeemable for cash and can only be used at ${sellerName}. All 
        purchases are final. In the event that the merchant is no longer open 
        at the time of redemption, Send Chinatown Love Inc. will not be able 
        to refund your purchase. Balance displayed in the voucher may or may not 
        represent the final balance. Final balance information is subject to 
        ${sellerName}'s most recent records.`
      default: 
        break;
    }
  }

  return (
    <div>
      <h3>Complete your {purchaseTypePhrase(true)}</h3>
      <p>Please add your payment information below</p>

      <PaymentContainer>
        <h3>Payment Information</h3>
        <RowFormat>
          <LabelText htmlFor="name">Full Name</LabelText>
          <InputText
            name="name"
            type="text"
            className="modalInput--input"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
          />
          <LabelText htmlFor="email">Email</LabelText>
          <InputText
            name="email"
            type="email"
            className="modalInput--input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            pattern={EMAIL_REGEX.source}
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
            <h3>Checkout details</h3>
            <span>
              {' '}
              {purchaseTypePhrase(false)} of{' '}
              <b>
                ${amount} {numberOfMealsText}
              </b>{' '}
              to {sellerName}{' '}
            </span>
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
                I'd like to receive email updates from Send Chinatown Love, such
                as when the merchant receives my donation/purchase or when a new
                merchant is onboarded
              </span>
            </CheckboxContainer>
            <p>
              {
                disclaimerLanguage(purchaseType)
              }
            </p>
            <ButtonRow>
              <BackButton
                type="button"
                className={'modalButton--back'}
                onClick={() => dispatch({ type: SET_MODAL_VIEW, payload: 0 })}
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

export default SquareModal;

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;

  div {
    width: 100%;
  }
`;

const RowFormat = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  text-transform: uppercase;
`;

const LabelText = styled.label`
  color: #373f4a;
`;

const InputText = styled.input`
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
