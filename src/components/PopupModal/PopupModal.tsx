import * as React from 'react';
import styles from './styles.module.scss';
import Popup from 'reactjs-popup';
import CheckoutForm from '../CheckoutForm';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_5AByIibLOhR6WHL3Mwnmel3P00zm0pIDrD');

export interface Props {
  merchant: string;
  option: string;
  className?: string;
}

const PopupModal: React.SFC<Props> = ({ merchant, option, className }) => (
  <Popup
    trigger={<button className={className}>{ option }</button>}
    position="top left" modal closeOnDocumentClick
  >
    {close => (
      <div className={styles.modal}>
        <div className={styles.header}>{ option === "Donate"? "Donation" : "Gift Card" }</div>
        <div className={styles.content}>
          <Elements stripe={stripePromise}>
            {/* <CheckoutForm merchant={merchant} option={option === "Donate"? "Donation" : "Gift Card"}/> */}
            {/* <CheckoutForm /> */}

          </Elements>
        </div>
      </div>
    )}
  </Popup>
);

export default PopupModal;
