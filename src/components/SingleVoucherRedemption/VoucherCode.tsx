import React from 'react';
import styles from './styles.module.scss';

const VoucherCode = ({ voucherCode }) => (
  <section className={styles.body__voucherCode}>
    <div>
      <span className={styles.boldText}>VOUCHER CODE 餐券号码:</span>
      <h1 className={styles.heading__voucherCode}>{`${voucherCode}`}</h1>
    </div>
    <div>
      <span className={styles.text__codeDescription}>
        Show the Voucher Code when redeeming in person
      </span>
      <span className={styles.text__codeDescription}>出示餐券号码以兑换餐</span>
    </div>
  </section>
);

export default VoucherCode;
