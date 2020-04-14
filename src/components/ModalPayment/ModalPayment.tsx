import React, { useState } from 'react';
import classnames from 'classnames';
import { useStripe, useElements } from '@stripe/react-stripe-js';

import styles from './styles.module.scss';
import { makePayment, PaymentParams } from '../../utilities/api';
import ModalConfirmation from '../ModalConfirmation';
import CardSection from './CardSection';
import { Merchant } from '../../utilities/api';

type Props = {
  purchaseType: string;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  hidePaymentModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showPayModal: boolean;
  donatedAmt: number;
  merchant: Merchant;
};

const ModalConfirmBox: any = ModalConfirmation;

const ModalPayment = ({
  purchaseType,
  handleClose,
  hidePaymentModal,
  showPayModal,
  donatedAmt,
  merchant,
}: Props) => {
  const payment: PaymentParams = {
    amount: Number(donatedAmt) * 100,
    currency: 'usd',
    name: 'Gift Card',
    quantity: 1,
    description: `$${donatedAmt} to Shunfa Bakery`,
  };

  const [isShown, setIsShown] = useState(false);
  const showConfirmModal = () => setIsShown(true);
  const [isChecked, setChecked] = useState(false);
  const checkAgreement = () =>
    isChecked ? setChecked(false) : setChecked(true);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // returns stripe payment intent
    showConfirmModal(); // shows confirmation modal box
  };

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

        <h2>
          Complete your{' '}
          {purchaseType === 'donation' ? 'donation' : 'gift card purchase'}
        </h2>
        <p>Please add your payment information below</p>

        <div className={styles.paymentContainer}>
          <h3>Payment Information</h3>
          <CardSection /> <br />
          <h3>
            {purchaseType === 'donation' ? 'Donation' : 'Gift card'} details
          </h3>
          <span>
            Donate <b>${donatedAmt}</b> to Shunfa Bakery
          </span>{' '}
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
            * Given the unpredictable nature of current market conditions, in
            the event that the merchant runs out of business, gift cards will be
            treated as a donation to the merchant.
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
            <button
              type="button"
              className={'modalButton--filled'}
              onClick={handleSubmit}
              disabled={isChecked === false}
            >
              {' '}
              Confirm{' '}
            </button>
          </div>
        </div>
      </form>

      <ModalConfirmBox showConfirmModal={isShown} handleClose={handleClose} />
    </React.Fragment>
  );
};

export default ModalPayment;
