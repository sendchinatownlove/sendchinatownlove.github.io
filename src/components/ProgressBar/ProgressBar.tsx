import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, Theme } from '@material-ui/core/styles';

interface Props {
  amountRaised: number;
  targetAmount: number;
  progressBarColor: string;
  numContributions: number;
  numDonations: number;
  numGiftCards: number;
  donationAmount: number;
  giftCardAmount: number;
}

const SupporterTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#ffffff',
    color: 'rgba(0, 0, 0, 0.87)',
    width: 180,
    fontSize: theme.typography.pxToRem(14),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const ProgressBar = ({
  amountRaised,
  targetAmount,
  progressBarColor,
  numContributions,
  numDonations,
  numGiftCards,
  donationAmount,
  giftCardAmount,
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
      <div className={styles.contributionInfo}>
        <div>
          ${(Math.floor(amountRaised) / 100).toLocaleString()} of $
          {(Math.floor(targetAmount) / 100).toLocaleString()}
        </div>
        <div>
          <SupporterTooltip
            title={
              <React.Fragment>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <b>{numGiftCards}</b> gift cards
                      </td>
                      <td>
                        <b>${Math.floor(giftCardAmount) / 100}</b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>{numDonations}</b> donations
                      </td>
                      <td>
                        <b>${Math.floor(donationAmount) / 100}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </React.Fragment>
            }
            enterTouchDelay={50}
            placement="top"
          >
            <div>
              <b>{numContributions}</b> supporters
            </div>
          </SupporterTooltip>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
