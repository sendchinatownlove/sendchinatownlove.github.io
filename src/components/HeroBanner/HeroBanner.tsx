import * as React from 'react';
import styles from './styles.module.scss';
import sclLogo from './scl-logo.png';

type Props = {
  name: string;
};
const HeroBanner: React.SFC<Props> = ({ name }) => {
  return (
    <div className={styles.container} data-testid="hero-banner">
      <img className={styles.image} src={sclLogo} alt="Logo" />
      <div className={styles.header}>{name}</div>
    </div>
  );
};

export default HeroBanner;
