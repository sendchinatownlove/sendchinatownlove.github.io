import * as React from 'react';
import styles from './styles.module.scss';
import StoreDetails from '../StoreDetails';
import classnames from 'classnames';
import { Address, Seller } from '../../utilities';

type Props = {
  seller: Seller;
};

export const StoreInfo: React.SFC<Props> = ({ seller }) => {
  const {
    summary,
    story,
    cuisineName,
    addresses,
  } = seller;

  return (
    <section className={classnames(styles.container)}>
      <div className={styles.nationality}>{cuisineName}</div>
      <p>
        {addresses &&
          addresses.map((address: Address) => (
            <>
              <div className={styles.address}>{address.address1}</div>
              <div className={styles.address}>{address.address2}</div>
              <div className={styles.address}>{address.city}</div>
              <div className={styles.address}>{address.state}</div>
              <div className={styles.address}>{address.zip_code}</div>
              <div className={styles.address}>{address.phone_number}</div>
            </>
          ))}
      </p>
      <p>{summary}</p>
      <StoreDetails story={story} />
    </section>
  );
};
