import React, { useState } from 'react';
import classnames from 'classnames';

import { SquarePaymentForm, SimpleCard } from 'react-square-payment-form'
import 'react-square-payment-form/lib/default.css'
import styles from './styles.module.scss';
import SubmissionButton from './SubmissionButton';
import {makeSquarePayment, SquarePaymentParams, Buyer} from "../../utilities/api"

import { useModalPaymentState, useModalPaymentDispatch } from "../../utilities/hooks/ModalPaymentContext/context"
import { SET_MODAL_VIEW } from "../../utilities/hooks/ModalPaymentContext/constants"

type Props = {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
};


const ModalPayment = ({
  purchaseType,
  sellerId,
  sellerName
}: Props) => {

  const {amount} = useModalPaymentState();
  const dispatch = useModalPaymentDispatch()

  const purchaseTypePhrase = purchaseType === 'donation' ? 'Donation' : 'Gift card purchase';
  const checkAgreement = () => isChecked ? setChecked(false) : setChecked(true);

  const [isChecked, setChecked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessages, setErrorsMessages] = useState<string[]>([]);


  const cardNonceResponseReceived = (errors: any[], nonce: string) => {
    setErrorsMessages([])

    if (errors && errors.length > 0 && errors[0]) {
      setErrorsMessages(errors.map(error => error.message))
      return
    }

    const payment: SquarePaymentParams = {
      amount: Number(amount) * 100,
      currency: 'usd',
      item_type: purchaseType,
      quantity: 1,
      seller_id: sellerId
    };

    const buyer: Buyer = { name, email, nonce };

    return makeSquarePayment( nonce, payment, buyer )
      .then((res) => {
        if (res.status === 200) {
          dispatch({type: SET_MODAL_VIEW, payload: 2})
        } 
      })
      .catch((err) => {
        if( err.response
          && err.response.data
          && err.response.data.errors
          && err.response.data.errors.length > 0){          
          const responseErrors = err.response.data.errors
          const newErrors = errorMessages.length > 0 ? [...errorMessages,responseErrors.map((error: { detail: string }) => error.detail) ] : responseErrors.map((error: { detail: string }) => error.detail)
          setErrorsMessages(newErrors)
        }
      })
  }

  const applicationId = process.env.REACT_APP_SQUARE_APPLICATION_ID ? process.env.REACT_APP_SQUARE_APPLICATION_ID : ""
  const locationId = process.env.REACT_APP_SQUARE_SANDBOX_LOCATION_ID ? process.env.REACT_APP_SQUARE_SANDBOX_LOCATION_ID : ""

  const canSubmit = isChecked && name.length > 0 && email.length > 0;
  return (
    <React.Fragment>

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
                styles.label,
                styles.email,
                'modalInput--input'
              )}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
            />
          </div>
        </div>
        <SquarePaymentForm
          sandbox={true}
          applicationId={applicationId}
          locationId={locationId}
          cardNonceResponseReceived={cardNonceResponseReceived}
          formId="SPF"
          apiWrapper=""
        >
          <SimpleCard/>
          <br/>
          <h3>Checkout details</h3>
          {/* TODO(jmckibben): This should be replaced with Seller.name */}
          <span> {purchaseTypePhrase} of <b>${amount}</b> to ${sellerName} </span>
          <p />
          <div className={styles.row}>
            <input
              type="checkbox"
              name="checkbox"
              className={styles.checkbox}
              value="Agree"
              onClick={checkAgreement}
            />
            <label htmlFor="checkbox">
              I agree with the <b>Terms & Conditions</b>
            </label>
          </div>
          <p>
            By proceeding with your purchase, you understand that the gift card
            is not redeemable for cash and can only be used at the merchant’s
            restaurant. All purchases are final. In the event that the merchant
            is no longer open at the time of redemption, Send Chinatown Love
            Inc. will not be able to refund your purchase.
          </p>
          <div className={styles.btnRow}>
            <button
              type="button"
              className={'modalButton--back'}
              onClick={() => dispatch({type: SET_MODAL_VIEW, payload: 0})}
            >
              ᐸ Back
            </button>
            <SubmissionButton canSubmit={canSubmit}/>
          </div>
        </SquarePaymentForm>
        <div className="sq-error-message">
          {
            errorMessages.map(errorMessage =>
              <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
            )
          }
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalPayment;
