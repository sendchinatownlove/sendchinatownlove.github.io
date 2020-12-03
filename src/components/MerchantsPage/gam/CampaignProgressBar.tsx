import moment from 'moment';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { tabletScreens } from '../../../utilities/general/responsive';
import ProgressBar from './ProgressBar';
import type { SizeType } from './ProgressBar';

const PROGRESS_BAR_COLOR = '#CF6E8A';

const centsToDollars = (cents: number) =>
  Math.floor(cents / 100).toLocaleString();

interface Props {
  endDate: string;
  isActive: boolean;
  pricePerMeal: number; // In cents.
  size: SizeType;
  targetAmount: number; // In cents.
  totalRaised: number; // In cents.
}

const CampaignProgressBar = ({
  endDate,
  isActive,
  pricePerMeal,
  size,
  targetAmount,
  totalRaised,
}: Props) => {
  const { t } = useTranslation();

  const totalRaisedDollars = centsToDollars(totalRaised);

  const calculatePercentRaised = (raised: number, target: number) => {
    if (!raised) {
      return 0;
    }
    // TODO: Confirm the % we want to show if raised > target.
    return Math.round((raised / target) * 100);
  };
  const percentRaised = calculatePercentRaised(totalRaised, targetAmount);

  return (
    <Container>
      <TotalRaised>
        Total Raised:{' '}
        <TotalRaisedAmount>${totalRaisedDollars}</TotalRaisedAmount>
      </TotalRaised>
      <ProgressBarContainer>
        <ProgressBar
          amount={{ current: totalRaised, target: targetAmount }}
          color={PROGRESS_BAR_COLOR}
          size={size}
        />
      </ProgressBarContainer>
      <SubText>
        <ProgressTextContainer color={PROGRESS_BAR_COLOR}>
          {percentRaised}% {t('buyMeal.toTarget')}
        </ProgressTextContainer>{' '}
        ({Math.round(totalRaised / pricePerMeal)} {t('buyMeal.outOf')}{' '}
        {Math.round(targetAmount / pricePerMeal)} {t('buyMeal.meals')})
      </SubText>
      {isActive && (
        <EndsAtContainer>
          {t('buyMeal.endsIn')}{' '}
          <ProgressTextContainer color={PROGRESS_BAR_COLOR}>
            {moment(endDate).diff(moment(), 'days')}
          </ProgressTextContainer>{' '}
          {t('buyMeal.days')}
        </EndsAtContainer>
      )}
    </Container>
  );
};

export default CampaignProgressBar;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 18px;
  justify-content: flex-end;
  margin-right: 60px;
  padding-top: 16px;
  width: 100%;

  @media (${tabletScreens}) {
    margin-right: 0;
  }

  @media (${tabletScreens}) {
    font-size: 14px;
  }
`;

const TotalRaised = styled.div`
  color: #000000;
  letter-spacing: 0.02em;
  margin-bottom: 12px;
`;

const TotalRaisedAmount = styled.span`
  font-weight: 800;
`;

const SubText = styled.div`
  font-size: 16px;

  @media (${tabletScreens}) {
    font-size: 14px;
  }
`;

const ProgressBarContainer = styled.div`
  margin-bottom: 12px;
`;

const ProgressTextContainer = styled.span`
  color: ${({ color }: { color: string }) => color};
  font-weight: 600;
`;

const EndsAtContainer = styled.div`
  font-size: 16px;
  margin-top: 12px;

  @media (${tabletScreens}) {
    font-size: 14px;
  }
`;
