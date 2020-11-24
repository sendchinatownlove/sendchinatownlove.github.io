import moment from 'moment';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import ProgressBar from '../ProgressBar';

const PROGRESS_BAR_COLOR = '#CF6E8A';

const centsToDollars = (cents: number) =>
  Math.floor(cents / 100).toLocaleString();

interface Props {
  endDate: string;
  isActive: boolean;
  targetAmount: number; // In cents.
  totalRaised: number; // In cents.
  isModal?: boolean;
}

const MegaGamProgressBar = ({
  endDate,
  isActive,
  targetAmount,
  totalRaised,
  isModal,
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
    <Container isModal={isModal}>
      <TotalRaised>
        Total Raised:{' '}
        <TotalRaisedAmount>${totalRaisedDollars}</TotalRaisedAmount>
      </TotalRaised>
      <ProgressBarContainer>
        <ProgressBar
          amount={{ current: totalRaised, target: targetAmount }}
          color={PROGRESS_BAR_COLOR}
          size="LARGE"
        />
      </ProgressBarContainer>
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
    </Container>
  );
};

export default MegaGamProgressBar;

const Container = styled.div`
  flex: 1;
  font-size: ${({ isModal }: { isModal: boolean | undefined }) =>
    isModal ? '15px' : '18px'};
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

const ProgressBarContainer = styled.div`
  margin-bottom: 12px;
`;

const ProgressTextContainer = styled.span`
  color: ${({ color }: { color: string }) => color};
  font-weight: 600;
`;

const EndsAtContainer = styled.div`
  margin-top: 12px;
`;
