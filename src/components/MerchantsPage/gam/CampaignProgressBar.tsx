import * as React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import ProgressBar, { SIZE_TYPE } from './ProgressBar';

interface Props {
  isActive: boolean;
  numContributions: number;
  targetAmount: number;
  progressBarColor: string;
  lastContributionTime: Date;
  endDate: Date;
  isModal: boolean;
}

interface CampaignDescriptorContainerProps {
  isModal: boolean;
}

const CampaignProgressBar = ({
  isActive,
  isModal,
  numContributions,
  targetAmount,
  progressBarColor,
  lastContributionTime,
  endDate,
}: Props) => {
  const { t } = useTranslation();

  // "73% to target (73 out of 100 meals)"
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
    <Container>
      <TimeStamp>
        {lastContributionTimeAsPresentable(timeSinceLastContribution)}
      </TimeStamp>
      <ProgressBarContainer>
        <ProgressBar
          amount={{ current: numContributions, target: targetAmount }}
          color={progressBarColor}
          size={SIZE_TYPE.SMALL}
        />
      </ProgressBarContainer>
      <CampaignDescriptorContainer isModal={isModal}>
        <ProgressTextContainer color={progressBarColor}>
          {progressPercent}% {t('buyMeal.toTarget')}
        </ProgressTextContainer>{' '}
        ({numContributions} {t('buyMeal.outOf')} {targetAmount}{' '}
        {t('buyMeal.meals')})
      </CampaignDescriptorContainer>
      {isActive && (
        <CampaignDescriptorContainer className="right" isModal={isModal}>
          {t('buyMeal.endsIn')}{' '}
          <ProgressTextContainer color={progressBarColor}>
            {Math.ceil(daysUntilEnd)}
          </ProgressTextContainer>{' '}
          {t('buyMeal.days')}
        </CampaignDescriptorContainer>
      )}
    </Container>
  );
};

export default CampaignProgressBar;

CampaignProgressBar.defaultProps = {
  isModal: false,
};

const Container = styled.div`
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

const ProgressBarContainer = styled.div`
  margin-bottom: 15px;
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

const CampaignDescriptorContainer = styled.div`
  ${(props: CampaignDescriptorContainerProps) =>
    props.isModal
      ? `
    width: 100%;
    display: inline-block;
    @media (min-width: 600px) {
      width: 50%;

      &.right {
        text-align: right;
      }
    }
  `
      : `
    width: auto;
  `}
`;
