import React, { useState } from 'react';
import classnames from 'classnames';
import { useStripe, useElements } from '@stripe/react-stripe-js';

import styles from './styles.module.scss';
import { makePayment, PaymentParams, Buyer } from '../../utilities/api';
import ModalConfirmation from '../ModalConfirmation';
import CardSection from './CardSection';

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
  const payment: PaymentParams = {
    amount: Number(amount) * 100,
    currency: 'usd',
    item_type: purchaseType,
    quantity: 1,
    seller_id: sellerId,
  };

  const purchaseTypePhrase =
    purchaseType === 'donation' ? 'Donation' : 'Voucher purchase';

  const [isShown, setIsShown] = useState(false);
  const showConfirmModal = () => setIsShown(true);
  const [isChecked, setChecked] = useState(false);
  const checkAgreement = () =>
    isChecked ? setChecked(false) : setChecked(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const buyer: Buyer = { name, email };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // returns stripe payment intent
    await makePayment(stripe, elements, payment, buyer);
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
          <CardSection /> <br />
          <h3>Checkout details</h3>
          <span>
            {purchaseTypePhrase} of <b>${amount}</b> to Shunfa Bakery
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
            By proceeding with your purchase, you understand that the voucher
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
