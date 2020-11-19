import React from 'react';
import styles from './styles.module.scss';

// @TODO(wilsonj806) unify this with the formatCurrency util
const VoucherAmount = ({ value }) => {
  return (
    <section>
      <h1 className={styles.heading__amount}>{`$${(value / 100).toFixed(
        2
      )}`}</h1>
      <span className={styles.text__amountDescription}>
        Single-meal Voucher
      </span>
      <span className={styles.text__amountDescription}>单餐礼品卡</span>
    </section>
  );
};

export default VoucherAmount;
