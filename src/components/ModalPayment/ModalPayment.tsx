import React, { useState } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import styles from './styles.module.scss';
import ModalConfirmation from '../ModalConfirmation';
import CardSection from '../CheckoutForm/CardSection';

interface Props {
  purchaseType: string;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  hidePaymentModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showPayModal: boolean;
  donatedAmt: number;
  name: string;
  email: string;
  address: string;
  city: string;
  stateForm: string;
  zipcode: string;
}

const ModalConfirmBox: any = ModalConfirmation

const ModalPayment = ({purchaseType, handleClose, hidePaymentModal, showPayModal, donatedAmt, name, email, address, city, stateForm, zipcode}: Props) => {

  const [isShown, setIsShown] = useState(false);
  const showConfirmModal = () => setIsShown(true);
  const [isChecked, setChecked] = useState(false);
  const checkAgreement = () => isChecked ? setChecked(false) : setChecked(true);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    const lineItems = { 
      "amount": Number(donatedAmt) * 100,
      "currency": "usd",
      "name": "Gift Card",
      "quantity": 1,
      "description": `$${donatedAmt} to Shunfa Bakery`
    }

    // returns stripe payment intent 
    // *** NOTE: change url to whatever is the actual url when ready *** 
    const res = await axios.post('http://localhost:3001/charges', {
      line_items: [lineItems],
      merchant_id: "hello-world"
    }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    }).then(async (res) => {
        if (!stripe || !elements) return;
        else {
          const cardElement = elements!.getElement(CardElement);
          const result = await stripe!.confirmCardPayment(`${res.data.client_secret}`, {
            payment_method: {
              card: cardElement!,
              billing_details: {
                  name: name,
                  email: email,
                  address: {
                    city,
                    state: stateForm,
                    country: "US",
                    postal_code: zipcode,
                    line1: address
                  }
              },
            }
          });

          if (result.error) {
            console.log(result.error.message);
          } else {
              if (result.paymentIntent?.status === 'succeeded') {
                console.log(result.paymentIntent?.status, 'The payment has been processed!')
                showConfirmModal() // shows confirmation modal box 
              }
          }
        }
      })
  };

    return(
      <React.Fragment>
        <form id="payment-form" 
              className={classnames(styles.container, "modalForm--form")}
              style={{display: showPayModal ? "block" : "none" }} >
          <button className={"closeButton--close"} onClick={handleClose}> × </button> 

          <h2>Complete your {purchaseType === 'donation' ? "donation" : "gift card purchase"}</h2>
          <p>Please add your payment information below</p>

          <div className={styles.paymentContainer}>
              <h3>Payment Information</h3>
              <CardSection />  <br/>

              <h3>{purchaseType === 'donation' ? "Donation" : "Gift card"} details</h3>
              <span>Donate <b>${donatedAmt}</b> to Shunfa Bakery</span> <p />

              <div className={styles.row}>
                  <input type="checkbox" name="checkbox" className={styles.checkbox} value="Agree" onClick={checkAgreement}/>
                  <label htmlFor="checkbox">I agree with the <b>Terms & Conditions</b></label>
              </div>

              <p>* Given the unpredictable nature of current market conditions, in the event that the merchant runs out of business, gift cards will be treated as a donation to the merchant.</p>

              <div className={styles.btnRow}>
                  <button type='button' className={"modalButton--back"} onClick={hidePaymentModal}> ᐸ Back </button>
                  <button type='button' className={"modalButton--filled"} onClick={handleSubmit} disabled={isChecked === false}> Confirm </button>
              </div>
          </div>
        </form>

          <ModalConfirmBox showConfirmModal={isShown} handleClose={handleClose}/> 

      </React.Fragment>
    );
}

export default ModalPayment;

