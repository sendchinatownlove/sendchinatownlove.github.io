import * as React from 'react';
import styles from './styles.module.scss';
import sclLogo from './scl-logo.png';

const HeroBanner: React.SFC = () => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={sclLogo} alt="Logo" />
      <div className={styles.header}>
        {/* pass in props here for each store name*/}
        Shunfa Bakery
      </div>
    </div>
  );
};

export default HeroBanner;
