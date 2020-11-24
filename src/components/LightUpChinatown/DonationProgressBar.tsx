import * as React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface Props {
  raised: number;
}

interface GoalImgLeftProps {
  percentage: number;
}

const centsToDollars = (cents: number) =>
  Math.floor(cents / 100).toLocaleString();

const DonationProgressBar = (props: Props) => {
  const { t } = useTranslation();
  const percentage = (props.raised / 4700000) * 100;

  const RenderFinalGoal = () =>
    percentage >= 100 ? null : (
      <GoalImage className={`right ${percentage === 100 ? 'completed' : ''}`} />
    );

  return (
    <BarContainer>
      <ProgressBarHeader>
        <strong>
          {t('lightUpChinatown.progressBarHeader')} $
          {centsToDollars(props.raised)}
        </strong>
      </ProgressBarHeader>
      <ProgressBar>
        <Filler style={{ width: `${percentage >= 100 ? 100 : percentage}%` }} />
        <GoalImageLeft
          className={`left ${percentage >= 50 ? 'completed' : ''}`}
          percentage={percentage}
        />
        <RenderFinalGoal />
      </ProgressBar>
      <GoalContainer>
        <GoalText className={`left ${percentage >= 50 && 'completed'}`}>
          {t('lightUpChinatown.raiseGoal1')}
        </GoalText>
        <GoalText className={`right ${percentage >= 100 && 'completed'}`}>
          {t('lightUpChinatown.raiseGoal2')}
        </GoalText>
      </GoalContainer>
    </BarContainer>
  );
};
export default DonationProgressBar;

const BarContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 25px;
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
  height: 25px;
  border-radius: inherit;
  box-shadow: inherit;
  background: #f6c342;
`;

const GoalImage = styled.div`
  width: 25px;
  height: 25px;
  border: 4px solid #ff3a2f;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  border-radius: 12px;
  background: white;
  &.right {
    right: 0;
  }

  &.completed {
    background-color: #ff3a2f;
  }
`;

const GoalImageLeft = styled(GoalImage)`
  ${(props: GoalImgLeftProps) =>
    props.percentage >= 50
      ? `left: calc(${props.percentage < 100 ? props.percentage : 100}% - 25px)`
      : `left: calc(50% - 25px)`}
`;

const GoalContainer = styled.div`
  width: 100%;
  position: relative;
  height: 18px;
  font-size: 13px;
  white-space: nowrap;
`;

const GoalText = styled.div`
  position: absolute;
  &.left {
    left: calc(50% - 50px);
  }

  &.right {
    right: 0;
  }

  &.completed {
    font-weight: bold;
  }
`;
