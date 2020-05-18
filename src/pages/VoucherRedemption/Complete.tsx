import React from 'react';
import {
  useVoucherState,
  useVoucherDispatch,
} from '../../utilities/hooks/VoucherContext/context';
import { SET_VIEW } from '../../utilities/hooks/VoucherContext/constants';
import { AmountContainer, Text, Footer, NextButton } from './styles';

interface Props {}
const Amount = (props: Props) => {
  const { amount, voucher } = useVoucherState();
  const dispatch = useVoucherDispatch();

  const setView = (view) => {
    dispatch({ type: SET_VIEW, payload: view });
  };

  return (
    <Footer>
      <AmountContainer>
        <Text width="100%" align="flex-start" onClick={(e) => setView(2)}>
          {`< Back`}
        </Text>
      </AmountContainer>
      <AmountContainer>
        <Text bold="true" size="24px">
          {' '}
          Redemption Complete{' '}
        </Text>
      </AmountContainer>
      <AmountContainer>
        <Text bold="true" size="24px">
          $ {(voucher.amount / 100 - amount).toFixed(2)}
        </Text>
        <Text size="16px">Remaining voucher balance</Text>
      </AmountContainer>
      <br />
      <Text size="24px" bold="true" width="80%" textAlign="center">
        Thank you for dining at {voucher.ownerName}!
      </Text>
      <br />
      <br />
      <NextButton onClick={(e) => setView(0)}>Finish</NextButton>
    </Footer>
  );
};

export default Amount;
