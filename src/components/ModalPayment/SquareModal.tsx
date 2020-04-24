import React, { useState } from 'react';
import classnames from 'classnames';
import { Checkbox } from '@material-ui/core';

import { SquarePaymentForm, SimpleCard } from 'react-square-payment-form';
import 'react-square-payment-form/lib/default.css';
import styles from './styles.module.scss';
import SubmissionButton from './SubmissionButton';
import {
  makeSquarePayment,
  SquarePaymentParams,
  Buyer,
} from '../../utilities/api';

import {
  useModalPaymentState,
  useModalPaymentDispatch,
} from '../../utilities/hooks/ModalPaymentContext/context';
import { SET_MODAL_VIEW } from '../../utilities/hooks/ModalPaymentContext/constants';

type Props = {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
};

const ModalPayment = ({ purchaseType, sellerId, sellerName }: Props) => {
  const { amount } = useModalPaymentState();
  const dispatch = useModalPaymentDispatch();

  const purchaseTypePhrase =
    purchaseType === 'donation' ? 'Donation' : 'Gift card purchase';
  const checkAgreement = () =>
    isChecked ? setChecked(false) : setChecked(true);

  const [isChecked, setChecked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessages, setErrorsMessages] = useState<string[]>([]);

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
      seller_id: sellerId,
    };

    const buyer: Buyer = { name, email, nonce };

    return makeSquarePayment(nonce, payment, buyer)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: SET_MODAL_VIEW, payload: 2 });
        }
      })
      .catch((err) => {
        if (err.response) {

          const responseErrors = err.response.data.errors;
          // const newErrors =
          //   errorMessages.length > 0
          //     ? [
          //         ...errorMessages,
          //         responseErrors.map(
          //           (error: { detail: string }) => error.detail
          //         ),
          //       ]
          //     : responseErrors.map((error: { detail: string }) => error.detail);
          const newErrors = responseErrors.length > 0 ? responseErrors.map((error: { detail: string }) => error.detail) : [];
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

  const canSubmit = isChecked && name.length > 0 && email.length > 0;
  return (
    <div className={styles.container}>
      <h2>Complete your {purchaseTypePhrase.toLowerCase()}</h2>
      <p>Please add your payment information below</p>

      <div className={styles.paymentContainer}>
        <h3>Payment Information</h3>
        <div className={styles.inputRow}>
          <div className={styles.row}>
            <span className={classnames('fa fa-user', styles.icons)} />
            <input
              name="name"
              type="text"
              className={classnames(styles.label, 'modalInput--input')}
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
            />
          </div>
          <div className={styles.row}>
            <span className={classnames('fa fa-envelope', styles.icons)} />
            <input
              name="email"
              type="email"
              className={classnames(
                styles.email,
                'modalInput--input',
                styles.label
              )}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
            />
          </div>
        </div>
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
          <SimpleCard />
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
                onClick={checkAgreement}
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
              By proceeding with your purchase, you understand that the gift
              card is not redeemable for cash and can only be used at{' '}
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
  );
};

export default ModalPayment;
