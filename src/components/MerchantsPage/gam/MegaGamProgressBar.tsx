import moment from 'moment';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const PROGRESS_BAR_COLOR = '#CF6E8A';

const centsToDollars = (cents: number) =>
  Math.floor(cents / 100).toLocaleString();

interface Props {
  endDate: string;
  isActive: boolean;
  targetAmount: number; // In cents.
  totalRaised: number; // In cents.
}

const MegaGamProgressBar = ({
  endDate,
  isActive,
  targetAmount,
  totalRaised,
}: Props) => {
  const { t } = useTranslation();

  const totalRaisedDollars = centsToDollars(totalRaised);
  const targetAmountDollars = centsToDollars(targetAmount);

  // "73% to target ($10,000)"
  const calculatePercentRaised = (raised: number, target: number) => {
    if (!raised) {
      return 0;
    }
    // TODO: Confirm the % we want to show if raised > target.
    return Math.round((raised / target) * 100);
  };
  const percentRaised = calculatePercentRaised(totalRaised, targetAmount);

  // "Ends in 2 days"
  const daysLeftInCampaign = moment(endDate).diff(moment(), 'days');

  return (
    <ProgressBarContainer>
      <TotalRaised>
        Total Raised:{' '}
        <TotalRaisedAmount>${totalRaisedDollars}</TotalRaisedAmount>
      </TotalRaised>
      <TargetAmountBar className="progress-bar">
        <CurrentProgressBar
          style={{
            backgroundColor: PROGRESS_BAR_COLOR,
            width: `${Math.min(percentRaised, 100)}%`,
          }}
        ></CurrentProgressBar>
      </TargetAmountBar>
      <div>
        <ProgressTextContainer color={PROGRESS_BAR_COLOR}>
          {percentRaised}% {t('buyMeal.toTarget')}
        </ProgressTextContainer>{' '}
        (${targetAmountDollars})
      </div>
      {isActive && (
        <EndsAtContainer>
          {t('buyMeal.endsIn')}{' '}
          <ProgressTextContainer color={PROGRESS_BAR_COLOR}>
            {daysLeftInCampaign}
          </ProgressTextContainer>{' '}
          {t('buyMeal.days')}
        </EndsAtContainer>
      )}
    </ProgressBarContainer>
  );
};

export default MegaGamProgressBar;

const ProgressBarContainer = styled.div`
  flex: 1;
  font-size: 18px;
  margin-right: 60px;
  padding: 16px 0;
  width: 100%;
`;

const TotalRaised = styled.div`
  color: #000000;
  letter-spacing: 0.02em;
  margin-bottom: 12px;
`;

const TotalRaisedAmount = styled.span`
  font-weight: 800;
`;

const TargetAmountBar = styled.div`
  background-color: #eaeaea;
  border-radius: 24px;
  margin-bottom: 12px;
  overflow: hidden;
`;

const CurrentProgressBar = styled.div`
  height: 24px;
`;

const ProgressTextContainer = styled.span`
  color: ${({ color }: { color: string }) => color};
  font-weight: 600;
`;

const EndsAtContainer = styled.div`
  margin-top: 12px;
`;
