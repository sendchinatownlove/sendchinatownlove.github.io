import * as React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';

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
    <ProgressBarContainer>
      <SupporterTooltip
        title={
          <React.Fragment>
            <ToolTipTable>
              <tbody>
                <tr>
                  <td>
                    <b>{numGiftCards}</b> vouchers
                  </td>
                  <td>
                    <b>${Math.floor(giftCardAmount / 100).toLocaleString()}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>{numDonations}</b> donations
                  </td>
                  <td>
                    <b>${Math.floor(donationAmount / 100).toLocaleString()}</b>
                  </td>
                </tr>
              </tbody>
            </ToolTipTable>
          </React.Fragment>
        }
        enterTouchDelay={50}
        placement="top"
      >
        <TargetAmountBar className="progress-bar">
          <CurrentProgressBar
            style={{
              width: `${progressWidth(amountRaised, targetAmount)}%`,
              backgroundColor: progressBarColor,
              //defaults to default color if no color is passed in
            }}
          >
            {' '}
          </CurrentProgressBar>
        </TargetAmountBar>
      </SupporterTooltip>
      <ContributionInfoContainer>
        <div>
          ${Math.floor(amountRaised / 100).toLocaleString()} of $
          {Math.floor(targetAmount / 100).toLocaleString()}
        </div>
        <div>
          <div>
            <b>{numContributions}</b> supporters
          </div>
        </div>
      </ContributionInfoContainer>
    </ProgressBarContainer>
  );
};

export default ProgressBar;

const ProgressBarContainer = styled.div`
  width: 100%;
  padding: 15px 0;
`;

const TargetAmountBar = styled.div`
  background-color: #dedede;
  height: 12px;
  margin-bottom: 15px;
`;

const CurrentProgressBar = styled.div`
  background-color: #dd678a;
  z-index: 5;
  height: 12px;
`;

const ContributionInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ToolTipTable = styled.table`
  width: 100%;
`;
