import moment from 'moment';
import React from 'react';

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
  isModal: boolean;
  isActive: boolean;
  pricePerMeal: number; // In cents.
  size: SizeType;
  targetAmount: number; // In cents.
  totalRaised: number; // In cents.
}

interface CampaignDescriptorContainerProps {
  isModal: boolean;
}

const CampaignProgressBar = ({
  endDate,
  isModal,
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
      <ProgressTextContainer>
        <CampaignDescriptorContainer isModal={isModal}>
          <ProgressText color={PROGRESS_BAR_COLOR}>
            {percentRaised}% {t('buyMeal.toTarget')}
          </ProgressText>{' '}
          ({Math.round(totalRaised / pricePerMeal)} {t('buyMeal.outOf')}{' '}
          {Math.round(targetAmount / pricePerMeal)} {t('buyMeal.meals')})
        </CampaignDescriptorContainer>
        {isActive && (
          <EndsAtContainer isModal={isModal}>
            {t('buyMeal.endsIn')}{' '}
            <ProgressText color={PROGRESS_BAR_COLOR}>
              {moment(endDate).diff(moment(), 'days')}
            </ProgressText>{' '}
            {t('buyMeal.days')}
          </EndsAtContainer>
        )}
      </ProgressTextContainer>
    </Container>
  );
};

export default CampaignProgressBar;

CampaignProgressBar.defaultProps = {
  isModal: false,
};

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

const ProgressBarContainer = styled.div`
  margin-bottom: 12px;
`;

const ProgressText = styled.span`
  color: ${({ color }: { color: string }) => color};
  font-weight: 600;
`;

const ProgressTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-wrap: wrap;
  @media ${tabletScreens} {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const CampaignDescriptorContainer = styled.div`
  font-size: 16px;
  @media (${tabletScreens}) {
    font-size: 14px;
  }
  ${(props: CampaignDescriptorContainerProps) =>
    props.isModal
      ? `
    width: 100%;
    display: inline-block;
    @media (min-width: 600px) {
      width: 50%;

    }
  `
      : `
    width: auto;
  `}
`;

const EndsAtContainer = styled(CampaignDescriptorContainer)`
  ${(props: CampaignDescriptorContainerProps) =>
    props.isModal &&
    `
  @media (min-width: 600px) {
    text-align: right;

  }
  `}
`;
