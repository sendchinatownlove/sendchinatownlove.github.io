import React from 'react';
import {
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
} from 'react-square-payment-form';
import 'react-square-payment-form/lib/default.css';
import styles from './styles.module.scss';

type Props = {};

const SquareCardForm = (props: Props) => {
  return (
    <fieldset className="sq-fieldset">
      <CreditCardNumberInput />

      <div className={styles.squareCardRow}>
        <div className={styles.squareCardRowItem}>
          <CreditCardExpirationDateInput />
        </div>
        <div className={styles.squareCardRowItem}>
          <CreditCardCVVInput />
        </div>
        <div className={styles.squareCardRowItem}>
          <CreditCardPostalCodeInput />
        </div>
      </div>
    </fieldset>
  );
};

export default SquareCardForm;
