import React, { useState } from 'react';
import classnames from 'classnames';
import { Checkbox } from '@material-ui/core';
import { SquarePaymentForm } from 'react-square-payment-form';
import 'react-square-payment-form/lib/default.css';
import styles from './styles.module.scss';
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

type Props = {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
  idempotencyKey: string;
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

    const payment: SquarePaymentParams = {
      amount: Number(amount) * 100,
      currency: 'usd',
      item_type: purchaseType,
      quantity: 1,
    };

    const buyer: Buyer = {
      name,
      email,
      nonce,
      idempotency_key: idempotencyKey,
      is_subscribed: isSubscriptionChecked,
    };

    return makeSquarePayment(nonce, sellerId, payment, buyer)
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
  const purchaseTypePhrase =
    purchaseType === 'donation' ? 'Donation' : 'Voucher purchase';

  const canSubmit =
    isTermsChecked && name.length > 0 && email.length > 0 && EMAIL_REGEX.test(email);
  return (
    <div className={styles.container}>
      <h2 className={styles.paymentHeader}>
        Complete your {purchaseTypePhrase.toLowerCase()}
      </h2>
      <p>Please add your payment information below</p>

      <div className={styles.paymentContainer}>
        <h3>Payment Information</h3>
        <div className={styles.inputRow}>
            <input
              name="name"
              type="text"
              className={classnames(styles.label, 'modalInput--input')}
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
            />
            <input
              name="email"
              type="email"
              className={classnames(
                'modalInput--input',
                styles.label
              )}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              pattern={EMAIL_REGEX.source}
              required
            />
        </div>
        <div className={styles.sqPaymentForm}>
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
            <h3 className={styles.text}>Checkout details</h3>
            <span className={styles.text}>
              {' '}
              {purchaseTypePhrase} of <b>${amount}</b> to {sellerName}{' '}
            </span>
            <p />
            <div>
              <label className={styles.termsAndConditions}>
                <Checkbox
                  value="checkedA"
                  inputProps={{ 'aria-label': 'Checkbox A' }}
                  onClick={checkTermsAgreement}
                  checked={isTermsChecked}
                />
                <span>
                  I agree with the <b>Terms & Conditions</b>
                </span>
              </label>
            </div>
            {purchaseTypePhrase === 'Donation' ? (
              <p>
                By proceeding with your transaction, you understand that you are
                making a donation to {sellerName}. No goods or services were
                exchanged for this donation.
              </p>
            ) : (
              <p>
                By proceeding with your purchase, you understand that the
                voucher card is not redeemable for cash and can only be used at{' '}
                {sellerName}. All purchases are final. In the event that the
                merchant is no longer open at the time of redemption, Send
                Chinatown Love Inc. will not be able to refund your purchase.
              </p>
            )}
            <div className={styles.btnRow}>
              <button
                type="button"
                className={classnames('modalButton--back', styles.backBtn)}
                onClick={() => dispatch({ type: SET_MODAL_VIEW, payload: 0 })}
              >
                ᐸ Back
              </button>
              <SubmissionButton canSubmit={canSubmit} />
            </div>
          </SquarePaymentForm>
        </div>
      </div>
    </div>
  );
};

export default SquareModal;
