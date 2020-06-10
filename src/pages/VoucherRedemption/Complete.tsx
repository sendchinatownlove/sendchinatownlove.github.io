import React from 'react';
import {
  useVoucherState,
  useVoucherDispatch,
} from '../../utilities/hooks/VoucherContext/context';
import {
  SET_AMOUNT,
  SET_VIEW,
} from '../../utilities/hooks/VoucherContext/constants';
import { AmountContainer, Text, Footer, NextButton } from './styles';

interface Props {}
const Amount = (props: Props) => {
  const { amount, voucher } = useVoucherState();
  const dispatch = useVoucherDispatch();

  const setView = (e) => {
    dispatch({ type: SET_AMOUNT, payload: 0 });
    dispatch({ type: SET_VIEW, payload: 0 });
  };

  return (
    <Footer height="90vh" style={{flex: 1}}>
      <AmountContainer>
        <Text bold="true" size="24px">
          Redemption Complete
        </Text>
      </AmountContainer>
      {!voucher.single_use ? (
        <AmountContainer>
          <Text bold="true" size="24px">
            $ {(amount / 100).toFixed(2)}
          </Text>
          <Text size="16px">Remaining voucher balance</Text>
        </AmountContainer>
      ) : (
        ''
      )}
      <br />
      <Text size="24px" bold="true" width="80%" align="center">
        Thank you for dining at {voucher.ownerName}!
      </Text>
      <br />
      <br />
      <NextButton onClick={(e) => setView(0)}>Finish</NextButton>
    </Footer>
  );
};

export default Amount;
