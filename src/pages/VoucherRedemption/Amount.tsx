import React, { useState } from 'react';
import styled from 'styled-components';
import {
  useVoucherState,
  useVoucherDispatch,
} from '../../utilities/hooks/VoucherContext/context';
import {
  SET_AMOUNT,
  SET_VIEW,
} from '../../utilities/hooks/VoucherContext/constants';
import ImageSrc from '../../images/sample-banner.png';

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
    if (e.target.value > voucher.amount)
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

      <Image src={ImageSrc} alt="Logo" />
      <AmountContainer>
        <Text bold="true" size="24px">
          ${voucher.amount === 0 ? '0.00' : (voucher.amount / 100).toFixed(2)}
        </Text>
        <Text size="16px">Current balance</Text>
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
      <MessageConatiner>
        <Text size="16px" color="#DD678A" width="50%">
          {error}
        </Text>
        <Text size="16px" width="50%">
          <Text color="black" width="100%" align="flex-end" padding="true">
            {voucher.amount - amount < 0 && '- '}$
            {Math.abs(voucher.amount - amount)}
          </Text>
          <Text align="flex-end" width="80px">
            Remaining
          </Text>
        </Text>
      </MessageConatiner>
      <Footer>
        <Text>
          {' '}
          Voucher Code: <b>AH2-TA</b>{' '}
        </Text>
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
const AmountContainer = styled.div`
  width: 95%;
  margin: 12px auto;
  margin-bottom: 0;
  color: black;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const MessageConatiner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 12px;
  width: 95%;
`;
const Image = styled.img`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;
const Text = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  ${(props: TextProps) => props.size && `font-size: ${props.size};`}
  ${(props: TextProps) => props.bold === 'true' && `font-weight: 600;`}
  ${(props: TextProps) => props.color && `color: ${props.color};`}
  ${(props: TextProps) => props.width && `width: ${props.width};`}
  ${(props: TextProps) => props.align && `justify-content: ${props.align};`}
  ${(props: TextProps) => props.padding === 'true' && `padding-right: 5px;`}

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

const Footer = styled.div`
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
`;

const NextButton = styled.button`
  background: black;
  color: white;
  font-size: 18px;
  border-radius: 32px;
  margin: 24px auto;
  width: 80%;
  text-align: center;
  height: 60px;
  align-items: center;
  justify-content: center;
`;
