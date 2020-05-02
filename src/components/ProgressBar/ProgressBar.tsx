import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

interface Props {
  amountRaised: number;
  targetAmount: number;
  progressBarColor: string;
}

const ProgressBar = ({
  amountRaised,
  targetAmount,
  progressBarColor,
}: Props) => {
  const progressWidth = (raised: number, target: number) => {
    if (raised < target) return (raised / target) * 100;
    return 100;
  };

  return (
    <div className={styles.progressContainer}>
      <div className={classnames(styles.targetAmountBar, 'progress-bar')}>
        <div
          className={styles.currentRaisedBar}
          style={{
            width: `${progressWidth(amountRaised, targetAmount)}%`,
            backgroundColor: progressBarColor,
            //defaults to default color if no color is passed in
          }}
        >
          {' '}
        </div>
      </div>
      <div>
        ${(Math.floor(amountRaised) / 100).toLocaleString()} of $
        {(Math.floor(targetAmount) / 100).toLocaleString()}
      </div>
    </div>
  );
};

export default ProgressBar;
