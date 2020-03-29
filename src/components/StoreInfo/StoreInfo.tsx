import * as React from 'react';
import styles from './styles.module.scss';
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
}

const StoreInfo: React.SFC<Props> = ({
  nationality,
  name,
  address,
  phoneNumber,
  introduction,
  className
}) => {
  return (
    <section className={classnames(styles.container, className)}>
      <div className={styles.nationality}>{nationality}</div>
      <h1>{name}</h1>
      <p>
        {address.line1}
        {address.line2}
        {phoneNumber}
      </p>
      <p>{introduction}</p>
    </section>
  );
};

export default StoreInfo;
