import * as React from 'react';
import styles from './styles.module.scss';
import StoreDetails from '../StoreDetails';
import classnames from 'classnames';
import { Seller } from '../../utilities';

type Props = {
  seller: Seller;
};

export const StoreInfo: React.SFC<Props> = ({ seller }) => {
  const {
    summary,
    story,
    className,
    cuisineName,
    address,
    phoneNumber,
  } = seller;

  console.log('StoreInfo: ', { seller });

  return (
    <section className={classnames(styles.container, className)}>
      <div className={styles.nationality}>{cuisineName}</div>
      <p>
        {/* <div className={styles.address}>{address.line1}</div>
        <div className={styles.address}>{address.line2}</div> */}
        <div className={styles.address}>{phoneNumber}</div>
      </p>
      <p>{summary}</p>
      <StoreDetails story={story} />
    </section>
  );
};
