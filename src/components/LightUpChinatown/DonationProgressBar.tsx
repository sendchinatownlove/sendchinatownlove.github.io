import * as React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface Props {
  raised: number;
}

const centsToDollars = (cents: number) =>
  Math.floor(cents / 100).toLocaleString();

const DonationProgressBar = (raised) => {
  const { t } = useTranslation();
  const percentage = `(${raised} / 47000) * 100`;

  return (
    <BarContainer>
      <ProgressBarHeader>
        {t('lightUpChinatown.progressBarHeader')} :{' '}
        <strong>${centsToDollars(raised)} </strong>
      </ProgressBarHeader>
      <ProgressBar>
        <Filler style={{ width: `${percentage}%` }} />
        <GoalImage1 />
        <GoalImage2 />
      </ProgressBar>
      <GoalContainer>
        <Goal1>{t('lightUpChinatown.raiseGoal1')}</Goal1>
        <Goal2>{t('lightUpChinatown.raiseGoal2')}</Goal2>
      </GoalContainer>
    </BarContainer>
  );
};
export default DonationProgressBar;

const BarContainer = styled.div`
  width: 100%;
  height: 93px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ProgressBarHeader = styled.div`
  font-size: 18px
  font-weight:800;
`;
const ProgressBar = styled.div`
  position: relative;
  height: 25px;
  width: 100%;
  background: #eaeaea;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const Filler = styled.div`
  height:100%
  border-radius:inherit;
  box-shadow:inherit;
  background:#F6C342;
`;

const GoalImage1 = styled.div`
  width: 25px;
  height: 25px;
  background: #ffffff;
  border: 4px solid #ff3a2f;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  border-radius: 12px;
`;
const GoalImage2 = styled(GoalImage1)`
  left: 98%;
  @media (max-width: 920px) {
    left: 92%;
  }
`;

const GoalContainer = styled.div`
  width: 100%;
  postion: relative;
  height: 18px;
  font-size: 13px;
  white-space: nowrap;
  @media (max-width: 920px) {
    font-size: 8px;
  }
`;

const Goal1 = styled.div`
  position: absolute;
  left: 48%;
`;

const Goal2 = styled.div`
  position: absolute;
  left: 86%;
  @media (max-width: 920px) {
    left: 80%;
  }
`;
