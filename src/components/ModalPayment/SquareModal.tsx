import React, { useState } from 'react';
import classnames from 'classnames';

import { SquarePaymentForm, SimpleCard } from 'react-square-payment-form'
import 'react-square-payment-form/lib/default.css'
import styles from './styles.module.scss';
import SubmissionButton from './SubmissionButton';
import {makeSquarePayment, SquarePaymentParams, Buyer} from "../../utilities/api"
import ModalConfirmation from '../ModalConfirmation';

type Props = {
  purchaseType: string;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  hidePaymentModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showPayModal: boolean;
  amount: number;
  sellerId: string;
};

const ModalConfirmBox: any = ModalConfirmation;

const ModalPayment = ({
  purchaseType,
  handleClose,
  hidePaymentModal,
  showPayModal,
  amount,
  sellerId,
}: Props) => {

  const purchaseTypePhrase =
    purchaseType === 'donation' ? 'Donation' : 'Gift card purchase';

  const [isShown, setIsShown] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const checkAgreement = () =>
    isChecked ? setChecked(false) : setChecked(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<string[]>([]);


  const cardNonceResponseReceived = (errors: any[], nonce: string, cardData: any, buyerVerificationToken: string | undefined) => {

    if (errors && errors.length > 0 && errors[0]) {
      setErrors(errors.map(error => error.message))
      return
    }
    setErrors([])

    const payment: SquarePaymentParams = {
      amount: Number(amount) * 100,
      currency: 'usd',
      item_type: purchaseType,
      quantity: 1,
      seller_id: sellerId,
      buyer_token: buyerVerificationToken
    };

    const buyer: Buyer = { name, email, nonce };

    return makeSquarePayment( payment, buyer )
      .then((res) => {
        if (res.status === 200) {
          setIsShown(true)
        } else {
          setIsShown(false)
        }
      })
  }

  const applicationId = process.env.REACT_APP_SQUARE_APPLICATION_ID ? process.env.REACT_APP_SQUARE_APPLICATION_ID : ""
  const locationId = process.env.REACT_APP_SQUARE_SANDBOX_LOCATION_ID ? process.env.REACT_APP_SQUARE_SANDBOX_LOCATION_ID : ""

  return (
    <React.Fragment>
      <form
        id="payment-form"
        className={classnames(styles.container, 'modalForm--form')}
        style={{ display: showPayModal ? 'block' : 'none' }}
      >
        <button className={'closeButton--close'} onClick={handleClose}>
          {' '}
          ×{' '}
        </button>

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
            <span> {purchaseTypePhrase} of <b>${amount}</b> to Shunfa Bakery </span>
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
                onClick={hidePaymentModal}
              >
                {' '}
                ᐸ Back{' '}
              </button>
              <SubmissionButton isChecked={isChecked}/>
            </div>
          </SquarePaymentForm>
          <div className="sq-error-message">
            {
              errors.map(errorMessage =>
                <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
              )
            }
          </div>
         </div>
      </form>

      <ModalConfirmBox showConfirmModal={isShown} handleClose={handleClose} />
    </React.Fragment>
  );
};

export default ModalPayment;
