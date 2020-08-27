import * as React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface Props {
  isActive: boolean;
  numContributions: number;
  targetAmount: number;
  progressBarColor: string;
  lastContributionTime: Date;
  endDate: Date;
}

const CampaignProgressBar = ({
  isActive,
  numContributions,
  targetAmount,
  progressBarColor,
  lastContributionTime,
  endDate,
}: Props) => {
  const { t } = useTranslation();

  // "73% to target (73 out of 100 meals)"
  const progressWidth = (raised: number, target: number) => {
    if (raised < target) return (raised / target) * 100;
    return 100;
  };
  const progressPercent = Math.floor((numContributions / targetAmount) * 100);

  // "Ends in 2 days"
  const timeUntilEnd = endDate.getTime() - Date.now();
  const daysUntilEnd = timeUntilEnd > 0 ? timeUntilEnd / (1000 * 3600 * 24) : 0;

  // "Last contribution made 2h ago"
  const timeSinceLastContribution = Date.now() - lastContributionTime.getTime();
  const lastContributionTimeAsPresentable = (
    timeSinceLastContribution: number
  ) => {
    const minutesSinceLastConstribution =
      timeSinceLastContribution / (1000 * 60);
    if (minutesSinceLastConstribution < 60) {
      return `${t('buyMeal.lastContributionMade')} ${Math.floor(
        minutesSinceLastConstribution
      )}m ${t('buyMeal.ago')}`;
    }
    const hoursSinceLastContribution = minutesSinceLastConstribution / 60;
    if (hoursSinceLastContribution < 24) {
      return `${t('buyMeal.lastContributionMade')} ${Math.floor(
        hoursSinceLastContribution
      )}h ${t('buyMeal.ago')}`;
    }
    const daysSinceLastContribution = hoursSinceLastContribution / 24;
    return `${t('buyMeal.lastContributionMade')} ${Math.floor(
      daysSinceLastContribution
    )}d ${t('buyMeal.ago')}`;
  };

  return (
    <ProgressBarContainer>
      <TimeStamp>
        {lastContributionTimeAsPresentable(timeSinceLastContribution)}
      </TimeStamp>
      <TargetAmountBar className="progress-bar">
        <CurrentProgressBar
          style={{
            width: `${progressWidth(numContributions, targetAmount)}%`,
            backgroundColor: progressBarColor,
          }}
        ></CurrentProgressBar>
      </TargetAmountBar>
      <div>
        <ProgressTextContainer color={progressBarColor}>
          {progressPercent}% {t('buyMeal.toTarget')}
        </ProgressTextContainer>{' '}
        ({numContributions} {t('buyMeal.outOf')} {targetAmount}{' '}
        {t('buyMeal.meals')})
      </div>
      {isActive && (
        <div>
          {t('buyMeal.endsIn')}{' '}
          <ProgressTextContainer color={progressBarColor}>
            {Math.ceil(daysUntilEnd)}
          </ProgressTextContainer>{' '}
          {t('buyMeal.days')}
        </div>
      )}
    </ProgressBarContainer>
  );
};

export default CampaignProgressBar;

const ProgressBarContainer = styled.div`
  width: 100%;
  padding: 15px 0;
`;

const ProgressTextContainer = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: ${(props) => props.color};
`;

const TargetAmountBar = styled.div`
  background-color: #dedede;
  height: 12px;
  margin-bottom: 15px;
`;

const CurrentProgressBar = styled.div`
  background-color: #dd678a;
  height: 12px;
`;

const TimeStamp = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 0.02em;
  color: #9e9e9e;
  margin-bottom: 10px;
`;
