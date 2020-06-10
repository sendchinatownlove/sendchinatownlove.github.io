import React, { useState } from 'react';
import styled from 'styled-components';
import {
  useVoucherState,
  useVoucherDispatch,
} from '../../utilities/hooks/VoucherContext/context';
import defaultStoreFront from '../../images/misc-store.png';
import MoreInfo from './MoreInfo';
import {
  SET_AMOUNT,
  SET_VIEW,
} from '../../utilities/hooks/VoucherContext/constants';
import {
  AmountContainer,
  MessageContainer,
  Text,
  Footer,
  NextButton,
  Voucher,
  Bold,
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

  const [error, setError] = useState('');

  const handleAmount = (e) => {
    setError('');
    if (e.target.value * 100 > voucher.amount)
      return setError('Please enter a valid amount');
    dispatch({ type: SET_AMOUNT, payload: e.target.value });
  };

  const setView = (view) => {
    dispatch({ type: SET_VIEW, payload: view });
  };

  return (
    <Container>
      <AmountContainer>
        <Text width="100%" align="flex-start" onClick={(e) => setView(0)}>
          {`< Cancel`}
        </Text>
      </AmountContainer>

      <Image
        src={
          voucher.storeImage
            ? process.env.REACT_APP_BASE_URL + voucher.storeImage
            : defaultStoreFront
        }
        alt={`${voucher.ownerName} Illustration`}
      />
      <AmountContainer bringToTheFront>
        <Text bold="true" size="24px">
          ${voucher.amount === 0 ? '0.00' : (voucher.amount / 100).toFixed(2)}
        </Text>
        <CurrentBalanceRow size="16px">
          Current balance <MoreInfo showShadow={true} />
        </CurrentBalanceRow>
      </AmountContainer>
      <AmountContainer>
        <Text size="18px">How much are you spending today?</Text>
        <AmountInput
          onChange={handleAmount}
          value={amount === 0 ? '' : amount}
          placeholder={'$0.00'}
          min="5"
          max="10000"
        />
      </AmountContainer>
      <MessageContainer>
        <Text size="16px" color="#DD678A" width="50%">
          {error}
        </Text>
        <Text size="16px" width="50%">
          <Text color="black" width="100%" align="flex-end" padding="true">
            $ {(voucher.amount / 100 - amount).toFixed(2)}
          </Text>
          <Text align="flex-end" width="80px">
            Remaining
          </Text>
        </Text>
      </MessageContainer>
      <Footer>
        <Voucher>
          Voucher Code: <Bold>{voucher.seller_gift_card_id}</Bold>{' '}
        </Voucher>
        <NextButton onClick={(e) => setView(2)}>Next</NextButton>
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
const CurrentBalanceRow = styled(Text)`
  justify-content: center;
`;
const Image = styled.img`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;
const AmountInput = styled.input`
  padding: 12px;
  height: 64px;
  font-size: 16px;
  width: 100%;
  margin: 12px auto;
  border: 1px solid black;
  border-radius: 5px;
`;
