import React from 'react';
import {
  useVoucherState,
  useVoucherDispatch,
} from '../../utilities/hooks/VoucherContext/context';
import {
  SET_AMOUNT,
  SET_VIEW,
} from '../../utilities/hooks/VoucherContext/constants';
import styled from 'styled-components';
import {
  ViewContainer,
  SubViewContainer,
  Text,
  Footer,
  SubmitButton,
} from './style';
import StoreBanner from './StoreBanner';

const Amount = () => {
  const { amount, voucher } = useVoucherState();
  const dispatch = useVoucherDispatch();

  const setView = (e) => {
    dispatch({ type: SET_AMOUNT, payload: 0 });
    dispatch({ type: SET_VIEW, payload: 0 });
  };

  return (
    <CompleteContainer>
      <StoreBanner />
      <MainView>
        <BoldText>Redemption Complete</BoldText>
        {!voucher.single_use ? (
          <SubViewContainer>
            <Text>$ {(amount / 100).toFixed(2)}</Text>
            <Text>Remaining voucher balance</Text>
          </SubViewContainer>
        ) : (
          ''
        )}
        <BoldText> Thank you for dining at {voucher.storeName}! </BoldText>
        <SubmitButton onClick={(e) => setView(0)}>Finish</SubmitButton>
      </MainView>
    </CompleteContainer>
  );
};

export default Amount;

const CompleteContainer = styled(ViewContainer)`
  height: 100%;
`;

const MainView = styled(Footer)`
  height: 100%;
  padding: 0 5%;
  justify-content: space-around;
`;

const BoldText = styled(Text)`
  font-weight: 600;
  font-size: 22px;
  line-height: 31px;
`;
