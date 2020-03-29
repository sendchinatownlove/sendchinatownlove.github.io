import * as React from 'react';
import bannerImage from './merchant-front.png';
import styles from './styles.module.scss';

const HeroBanner: React.SFC = () => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={bannerImage} alt="Merchant Store Front" />
    </div>
  )
};

export default HeroBanner;
