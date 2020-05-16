import React from 'react';
import styled from 'styled-components';
import Landing from './Landing';
import Amount from './Amount';
import Confirm from './Confirm';
import { useVoucherState } from '../../utilities/hooks/VoucherContext/context';

interface Props {}

const VoucherRedemption = (props: Props) => {
  const { view } = useVoucherState();

  const showView = () => {
    switch (view) {
      case 1:
        return <Amount />;
      case 2:
        return <Confirm />;
      default:
        return <Landing />;
    }
  };
  return <Container>{showView()}</Container>;
};

export default VoucherRedemption;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: white;
  flex-direction: column
  height: 100%;
`;
