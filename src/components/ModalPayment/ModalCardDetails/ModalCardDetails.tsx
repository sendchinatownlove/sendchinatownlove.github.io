import React, { useState, useEffect } from 'react';
import { times } from 'lodash/fp';
import { Checkbox } from '@material-ui/core';
import { SquarePaymentForm } from 'react-square-payment-form';
import 'react-square-payment-form/lib/default.css';
import { useTranslation, Trans } from 'react-i18next';
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
import useScrollToElement from '../../../utilities/hooks/useScrollToElement';

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
import { formatCurrency } from '../../../utilities/general/textFormatter';

type Props = {
  sellerId: string;
  sellerName: string;
  costPerMealInDollars: number;
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
  costPerMealInDollars,
  nonProfitLocationId,
  campaignId,
}: Props) => {
  const idempotencyKey = uuid();
  const { t } = useTranslation();
  const {
    amount,
    feesAmount,
    purchaseType,
    lucData,
    matchAmount,
    campaignState,
  } = useModalPaymentState(null);
  const dispatch = useModalPaymentDispatch(null);
  const modalRef = useScrollToElement();

  const [isTermsChecked, setTermsChecked] = useState(false);
  const [isSubscriptionChecked, setSubscriptionChecked] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessages, setErrorsMessages] = useState<string[]>([]);
  const [canSubmit, setCanSubmit] = useState(false);
  const isMegaGam: boolean =
    purchaseType === ModalPaymentTypes.modalPages.mega_gam;

  let applicationId, locationId, projectId;

  if (
    purchaseType === ModalPaymentTypes.modalPages.buy_meal &&
    nonProfitLocationId === process.env.REACT_APP_THINK_CHINATOWN_LOCATION_ID
  ) {
    applicationId = process.env.REACT_APP_THINK_CHINATOWN_APPLICATION_ID ?? '';
    locationId = process.env.REACT_APP_THINK_CHINATOWN_LOCATION_ID ?? '';
  } else if (sellerId === 'apex-for-youth') {
    applicationId = process.env.REACT_APP_APEX_APPLICATION_ID ?? '';
    locationId = process.env.REACT_APP_APEX_LOCATION_ID ?? '';
    // TODO (billy-yuan): Replace the next else if  statement with a less hacky solution after mega gam
  } else if (campaignState && campaignState.nonprofit_id === 2) {
    applicationId = process.env.REACT_APP_APEX_APPLICATION_ID ?? '';
    locationId = process.env.REACT_APP_APEX_LOCATION_ID ?? '';
  } else {
    applicationId = process.env.REACT_APP_SQUARE_APPLICATION_ID ?? '';
    locationId = process.env.REACT_APP_SQUARE_LOCATION_ID ?? '';
  }

  const projectIdsMap = {
    'light-up-chinatown': 1,
    'apex-for-youth': 2,
  };

  // if a project, map to projectId and remove sellerId
  // TODO (billy-yuan) Fix so we don't assign seller or project IDs in the front end
  if (projectIdsMap[sellerId]) {
    projectId = projectIdsMap[sellerId];
    sellerId = '';
  } else if (isMegaGam) {
    projectId = campaignState.project_id;
  }

  const checkTermsAgreement = () => setTermsChecked(!isTermsChecked);

  const checkSubscriptionAgreement = () =>
    setSubscriptionChecked(!isSubscriptionChecked);

  const numberOfMeals = Number(amount) / costPerMealInDollars;
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
      setCanSubmit(false);
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
    const itemType = isMegaGam
      ? 'donation'
      : purchaseTypeToItemType(purchaseType);

    const payment: SquareLineItems = is_distribution
      ? times(
          () => ({
            amount: costPerMealInDollars * 100,
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
            item_type: itemType,
            quantity: 1,
          },
        ];

    if (feesAmount) {
      payment.push({
        amount: feesAmount,
        currency: 'usd',
        item_type: 'transaction_fee',
        quantity: 1,
      });
    }

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
      is_distribution, // TODO (billy-yuan): will deprecate is_distribution after it is removed from the back-end
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
        return (
          <Trans
            i18nKey="modalPayment.modalCardDetails.header.mega_gam"
            values={{
              campaignName: campaignState.display_name,
            }}
          ></Trans>
        );
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
    setCanSubmit(checkFormValidity);
  }, [isTermsChecked, name, email]);

  const checkFormValidity = () => {
    return (
      isTermsChecked &&
      name.length > 0 &&
      email.length > 0 &&
      ModalPaymentConstants.EMAIL_REGEX.test(email)
    );
  };

  const setDisclaimerLanguage = (
    type: string | ModalPaymentTypes.modalPages
  ) => {
    if (sellerId === 'send-chinatown-love')
      type = ModalPaymentTypes.modalPages.donation_pool;

    switch (type) {
      case ModalPaymentTypes.modalPages.donation:
        return t('modalPayment.modalCardDetails.disclaimer.donation', {
          sellerName: sellerName,
        });
      case ModalPaymentTypes.modalPages.donation_pool:
        return t('modalPayment.modalCardDetails.disclaimer.donation_pool');
      case ModalPaymentTypes.modalPages.gift_card:
        return t('modalPayment.modalCardDetails.disclaimer.gift_card', {
          sellerName: sellerName,
        });
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
      type === ModalPaymentTypes.modalPages.mega_gam ||
      (type === ModalPaymentTypes.modalPages.light_up_chinatown &&
        amount >= LIGHT_UP_CHINATOWN_TIER_2_MIN)
    ) {
      return t('modalPayment.modalCardDetails.details.voucher');
    } else {
      return t('modalPayment.modalCardDetails.details.donation');
    }
  };

  const TransactionDetails = () => {
    const totalPaymentDollars = formatCurrency(100 * amount + feesAmount);
    const totalContributionDollars = formatCurrency(
      100 * (amount + matchAmount)
    );

    if (isMegaGam && matchAmount > 0) {
      return (
        <span>
          <Trans
            i18nKey="modalPayment.modalCardDetails.details.megagam_details_match"
            values={{
              totalPayment: totalPaymentDollars,
              totalContribution: totalContributionDollars,
            }}
          >
            <strong>{totalPaymentDollars}</strong>
            <strong>{totalContributionDollars}</strong>
          </Trans>
        </span>
      );
    }

    if (isMegaGam && matchAmount === 0) {
      return (
        <span>
          <Trans
            i18nKey="modalPayment.modalCardDetails.details.megagam_details_no_match"
            values={{
              totalPayment: totalPaymentDollars,
            }}
          >
            <strong>{totalPaymentDollars}</strong>
          </Trans>
        </span>
      );
    }

    return (
      <span>
        {' '}
        {purchaseTypeMessage(purchaseType, amount)} of{' '}
        <b>
          {totalPaymentDollars} {numberOfMealsText}
        </b>{' '}
        to {sellerName}{' '}
      </span>
    );
  };

  return (
    <FormContainer>
      <Header ref={modalRef}>
        {t('modalPayment.modalCardDetails.header.completeYour')}{' '}
        <span>{purchaseTypeHeader(purchaseType)}</span>{' '}
      </Header>
      <p>{t('modalPayment.modalCardDetails.body.paymentInfo')}</p>

      <PaymentContainer>
        <Subheader>
          {t('modalPayment.modalCardDetails.header.paymentInfo')}
        </Subheader>
        <RowFormat>
          <LabelText htmlFor="name">
            {t('modalPayment.modalCardDetails.body.fullName')}
            <InputText
              name="name"
              type="text"
              className="modalInput--input"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder={t('modalPayment.modalCardDetails.placeholders.name')}
            />
          </LabelText>
          <LabelText htmlFor="email">
            {t('modalPayment.modalCardDetails.body.email')}
            <InputText
              name="email"
              type="email"
              className="modalInput--input"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder={t(
                'modalPayment.modalCardDetails.placeholders.email'
              )}
              pattern={ModalPaymentConstants.EMAIL_REGEX.source}
              required
            />
          </LabelText>
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
            inputEventReceived={() => {
              console.log('??', checkFormValidity());
              if (checkFormValidity()) {
                setCanSubmit(true);
              }
            }}
          >
            <SquareCardForm />
            <div className="sq-error-message">
              {errorMessages.map((errorMessage) => (
                <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
              ))}
            </div>
            <br />
            <Subheader>{setDetailsText(purchaseType, amount)}</Subheader>
            <TransactionDetails />
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
                value="checkedB"
                inputProps={{ 'aria-label': 'Email Updates' }}
                onClick={checkSubscriptionAgreement}
                checked={isSubscriptionChecked}
              />
              <span>
                {t('modalPayment.modalCardDetails.body.emailUpdates')}
              </span>
            </CheckboxContainer>
            <CheckboxContainer>
              <Checkbox
                value="checkedA"
                inputProps={{ 'aria-label': 'Terms and Conditions' }}
                onClick={checkTermsAgreement}
                checked={isTermsChecked}
              />
              <Trans
                i18nKey="modalPayment.modalCardDetails.body.tAndC"
                components={{ bold: <strong /> }}
              >
                <span>{t('modalPayment.modalCardDetails.body.tAndC')}</span>
              </Trans>
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
    </FormContainer>
  );
};

export default ModalCardDetails;

const FormContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
`;

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
  @media (min-width: 900px) {
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;

export const LabelText = styled.label`
  color: #373f4a;
  width: 100%;
  @media (min-width: 900px) {
    width: 50%;
    margin-right: 16px;
  }
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
  white-space: pre-wrap;

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
