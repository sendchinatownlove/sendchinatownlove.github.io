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
  FlexFillSpace,
} from './styles';

interface Props { }
interface TextProps {
  bold?: string;
  color?: string;
  size?: string;
  width?: string;
  align?: string;
  padding?: string;
}

interface InputProps {
  error?: boolean;
}

const Amount = (props: Props) => {
  const { amount, voucher } = useVoucherState();
  const dispatch = useVoucherDispatch();

  const [error, setError] = useState('');

  const handleAmount = (e) => {
    setError('');
    if (e.target.value * 100 > voucher.amount || e.target.value < 0)
      return setError('Please enter a valid amount');
    dispatch({ type: SET_AMOUNT, payload: e.target.value });
  };

  const setView = (view) => {
    dispatch({ type: SET_VIEW, payload: view });
  };

  const setAmount = (amount) => {
    dispatch({ type: SET_AMOUNT, payload: amount });
  };

  return (
    <Container>
      <AmountContainer>
        <Text
          width="100%"
          align="flex-start"
          color="#474747"
          bold="true"
          wide
          onClick={(e) => {
            setAmount(0);
            setView(0);
          }}
        >
          {`< CANCEL`}
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
      <AmountContainer bringToTheFront height="60px">
        <Text bold="true" size="24px">
          ${voucher.amount === 0 ? '0.00' : (voucher.amount / 100).toFixed(2)}
        </Text>
        <CurrentBalanceRow size="16px">
          Current balance <MoreInfo showShadow inverted />
        </CurrentBalanceRow>
      </AmountContainer>
      <InputAreaWrapper>
        <AmountContainer>
          <Text size="18px">How much are you spending today?</Text>
          <InputWrapper>
            <AmountInput
              value={amount === 0 ? '' : amount}
              onChange={handleAmount}
              placeholder={'0.00'}
              type="number"
              error={!!error}
            />
          </InputWrapper>
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
      </InputAreaWrapper>
      <FlexFillSpace></FlexFillSpace>
      <Footer height="200px">
        <Voucher>
          Voucher Code: <Bold>{voucher.seller_gift_card_id}</Bold>{' '}
        </Voucher>
        <NextButton onClick={(e) => setView(2)} disabled={!!error || amount <= 0}>
          Next
        </NextButton>
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
  flex: 1;
`;
const CurrentBalanceRow = styled(Text)`
  justify-content: center;
`;
const Image = styled.img`
  width: 100%;
  max-width: 600px;
  min-height: 220px;
  margin: 0 auto;
`;
const InputWrapper = styled.div`
  position: relative;
  &:before {
    position: absolute;
    padding: 32px 0px 0px 16px;
    content: '$';
  }
`;
const AmountInput = styled.input`
  padding: 12px 12px 12px 32px;
  min-height: 64px;
  font-size: 16px;
  width: 100%;
  margin: 12px auto;
  border: 1px solid
    ${(props: InputProps) => (props.error ? '#DD678A' : 'black')};
  border-radius: 5px;
`;
const InputAreaWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 160px;
`;
