import * as React from 'react';
import styles from './styles.module.scss';
import StoreDetails, { StoreDetailsProps } from '../StoreDetails';
import classnames from 'classnames';

interface Props {
  nationality: string;
  name: string;
  address: {
    line1: string;
    line2: string;
  };
  phoneNumber: string;
  introduction: string;
  className?: string;
  storeDetailsProps: StoreDetailsProps;
}

const StoreInfo: React.SFC<Props> = ({
  nationality,
  name,
  address,
  phoneNumber,
  introduction,
  className,
  storeDetailsProps,
}) => {
  const detailsProps = {
    ...storeDetailsProps,
    className: styles.storeDetails,
  };
  return (
    <section className={classnames(styles.container, className)}>
      <div className={styles.nationality}>{nationality}</div>
      <p>
        <div className={styles.address}>{address.line1}</div>
        <div className={styles.address}>{address.line2}</div>
        <div className={styles.address}>{phoneNumber}</div>
      </p>
      <p>{introduction}</p>
      <StoreDetails {...detailsProps} />
    </section>
  );
};

export default StoreInfo;
