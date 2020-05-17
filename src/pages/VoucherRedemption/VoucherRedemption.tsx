import React, {useEffect} from 'react';
import styled from 'styled-components';
import Landing from './Landing';
import Amount from './Amount';
import Confirm from './Confirm';
import Complete from './Complete';
import { useVoucherState, useVoucherDispatch } from '../../utilities/hooks/VoucherContext/context';
import { SET_VOUCHER_INFO } from '../../utilities/hooks/VoucherContext/constants';

import { getVoucher } from '../../utilities/api/interactionManager';

interface Props {}

const VoucherRedemption = (props: Props) => {
  const { view } = useVoucherState();
  const dispatch = useVoucherDispatch();

  const fetchData = async () => {
    const data = await getVoucher("4bf2565e-8b77-478a-9de3-9cc00a89b6da");
    dispatch({ type: SET_VOUCHER_INFO, payload: data.gift_card_detail});
  }

  useEffect(() => {
    fetchData();
  }, [])

  const showView = () => {
    switch (view) {
      case 1:
        return <Amount />;
      case 2:
        return <Confirm />;
      case 3:
        return <Complete />;
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
