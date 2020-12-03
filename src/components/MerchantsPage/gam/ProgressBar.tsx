import React from 'react';
import styled from 'styled-components';

const calculatePercentRaised = (raised: number, target: number) => {
  if (!raised) {
    return 0;
  }
  // TODO: Confirm the % we want to show if raised > target.
  return Math.round((raised / target) * 100);
};

export const SIZE_TYPE = {
  SMALL: 'SMALL',
  LARGE: 'LARGE',
};
type SizeKeys = keyof typeof SIZE_TYPE;
export type SizeType = typeof SIZE_TYPE[SizeKeys];

interface Props {
  amount: {
    current: number;
    target: number;
  };
  color: string;
  size: SizeType;
}

const ProgressBar = ({ amount, color, size }: Props) => {
  return (
    <TargetAmountBar className="progress-bar">
      <CurrentProgressBar
        size={size}
        style={{
          backgroundColor: color,
          width: `${Math.min(
            calculatePercentRaised(amount.current, amount.target),
            100
          )}%`,
        }}
      />
    </TargetAmountBar>
  );
};

export default ProgressBar;

const TargetAmountBar = styled.div`
  background-color: #eaeaea;
  border-radius: 24px;
  overflow: hidden;
`;

const CurrentProgressBar = styled.div`
  height: ${({ size }: { size: SizeType }) =>
    size === 'SMALL' ? '12px' : '24px'};
`;
