import * as React from 'react';
import styles from './styles.module.scss';

interface Props {
  amountRaised: number;
  targetAmount: number;
}

const ProgressBar = ({ amountRaised, targetAmount }: Props) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.myBar}
          style={{
            width: `${(amountRaised / targetAmount) * 100}%`,
          }}
        >
          {' '}
        </div>
      </div>
      <br />
      <div>
        $ {Math.floor(amountRaised) / 100} out of $
        {Math.floor(targetAmount) / 100}{' '}
      </div>
    </div>
  );
};

export default ProgressBar;
