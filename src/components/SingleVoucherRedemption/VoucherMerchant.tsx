import React from 'react';
import styles from './styles.module.scss';

const VoucherMerchant = ({
  cnName,
  name,
  address1,
  city,
  state,
  zipCode,
  expirationDate,
}) => (
  <section className={styles.header__merchant}>
    <div>
      <h1 className={styles.heading__merchantName}>{`${cnName} ${name}`}</h1>
      <span className={styles.header__address}>{`${address1}`}</span>
      <span
        className={styles.header__address}
      >{`${city}, ${state} ${zipCode}`}</span>
    </div>
    <p>{`Expiration Date 有效期限: ${expirationDate}`}</p>
  </section>
);

export default VoucherMerchant;
