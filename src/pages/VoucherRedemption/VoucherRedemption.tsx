import React from 'react';
import styled from 'styled-components';
import Landing from './Landing';
import Amount from './Amount';
import { useVoucherState } from '../../utilities/hooks/VoucherContext/context';

interface Props {}

const VoucherRedemption = (props: Props) => {
  const { view } = useVoucherState();
  return <Container>{view === 0 ? <Landing /> : <Amount />}</Container>;
};

export default VoucherRedemption;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: white;
  flex-direction: column
  height: 100%;
`;

const FooterContainer = styled.div`
  width: 100%%;
  margin: 0 auto;
  background-color: white;
  flex-direction: column
  justify-content: center;
`;
