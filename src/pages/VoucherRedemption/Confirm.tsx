import React from 'react';
import styled from 'styled-components';
import {
  useVoucherState,
  useVoucherDispatch,
} from '../../utilities/hooks/VoucherContext/context';
import { SET_VIEW } from '../../utilities/hooks/VoucherContext/constants';
import {
  AmountContainer,
  MessageConatiner,
  Text,
  Footer,
  NextButton,
  Divider,
} from './styles';

interface Props {}
interface TextProps {
  bold?: String;
  color?: String;
  size?: String;
  width?: String;
  align?: String;
  padding?: String;
}

const Amount = (props: Props) => {
  const { amount, voucher } = useVoucherState();
  const dispatch = useVoucherDispatch();

  const setView = (view) => {
    dispatch({ type: SET_VIEW, payload: view });
  };

  return (
    <Container>
      <AmountContainer>
        <Text width="100%" align="flex-start" onClick={(e) => setView(1)}>
          {`< Back`}
        </Text>
      </AmountContainer>
      <AmountContainer>
        <Text bold="true" size="24px">
          Complete Your Purchase
        </Text>
      </AmountContainer>

      <MessageConatiner>
        <Text size="16px" width="50%">
          Voucher balance
        </Text>
        <Text size="16px" width="50%" align="flex-end">
          ${(voucher.amount /100).toFixed(2)}
        </Text>
      </MessageConatiner>
      <MessageConatiner>
        <Text size="16px" width="50%">
          Redemption Amount
        </Text>
        <Text size="16px" width="50%" align="flex-end">
          ${(amount/1).toFixed(2)}
        </Text>
      </MessageConatiner>
      <Divider />
      <MessageConatiner>
        <Text size="16px" width="50%">
          Remaining balance
        </Text>
        <Text bold="true" size="24px" width="50%" align="flex-end">
          ${(voucher.amount/100 - amount).toFixed(2)}
        </Text>
      </MessageConatiner>
      <VoucherContainer>
        <Text>
          {' '}
          Voucher Code: <b>{voucher.seller_gift_card_id}</b>{' '}
        </Text>
      </VoucherContainer>
      <Footer>
        <Text color="#ab192e" bold="true" width="50%" textAlign="center">
          Please show your phone to the merchant cashier to confirm the
          purchase.
        </Text>
        <NextButton onClick={(e) => setView(3)}>Next</NextButton>
      </Footer>
    </Container>
  );
};

export default Amount;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  color: black;
  display: flex;
  flex-direction: column;
`;

const VoucherContainer = styled.div`
  width: 90%;
  margin: 24px auto;
  color: black;
  display: flex;
  justify-content: center;
  padding: 16px;
  border: 2px solid #f7f7f7;
  border-radius: 12px;
`;