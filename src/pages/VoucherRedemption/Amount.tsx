import React, { useState } from 'react';
import styled from 'styled-components';
import {
  useVoucherState,
  useVoucherDispatch,
  VoucherConstants,
} from '../../utilities/hooks/VoucherContext';
import defaultStoreFront from '../../images/misc-store.png';
import MoreInfo from './MoreInfo';
import StoreBanner from './StoreBanner';
import {
  ViewContainer,
  MainView,
  SubViewContainer,
  BackButton,
  StoreFrontImage,
  Text,
  Footer,
  FooterLabel,
  SubmitButton,
} from './style';

interface Props {}

interface InputProps {
  error?: boolean;
}

const Amount = (props: Props) => {
  const { amount, voucher } = useVoucherState(null);
  const dispatch = useVoucherDispatch(null);

  const [error, setError] = useState('');

  const handleAmount = (e) => {
    setError('');
    if (e.target.value * 100 > voucher.amount || e.target.value < 0)
      return setError('Please enter a valid amount');
    dispatch({ type: VoucherConstants.SET_AMOUNT, payload: e.target.value });
  };

  const setView = (view) => {
    dispatch({ type: VoucherConstants.SET_VIEW, payload: view });
  };

  const setAmount = (amount) => {
    dispatch({ type: VoucherConstants.SET_AMOUNT, payload: amount });
  };

  const backToLanding = (e) => {
    setAmount(0);
    setView(0);
  };

  return (
    <Container>
      <StoreBanner />
      <MainView>
        <BackButton onClick={backToLanding}>CANCEL</BackButton>
        <StoreFrontImage
          src={
            voucher.storeImage
              ? process.env.REACT_APP_BASE_URL + voucher.storeImage
              : defaultStoreFront
          }
          alt={`${voucher.storeName} Illustration`}
        />
        <BalanceContainer>
          <Text>
            ${voucher.amount === 0 ? '0.00' : (voucher.amount / 100).toFixed(2)}
          </Text>
          <CurrentBalanceContainer>
            Current balance <MoreInfo showShadow inverted />
          </CurrentBalanceContainer>
        </BalanceContainer>
        <InputContainer>
          <SubViewContainer>
            <Text>How much are you spending today?</Text>
            <InputWrapper>
              <AmountInput
                value={amount === 0 ? '' : amount}
                onChange={handleAmount}
                placeholder={'0.00'}
                type="number"
                error={!!error}
              />
            </InputWrapper>
          </SubViewContainer>
          <MessagesContainer>
            <ErrorMessage>{error} </ErrorMessage>
            <RemainingMessage>
              <Text>$ {(voucher.amount / 100 - amount).toFixed(2)}</Text>
              <Text> Remaining</Text>
            </RemainingMessage>
          </MessagesContainer>
        </InputContainer>
      </MainView>
      <Footer>
        <FooterLabel>{voucher.seller_gift_card_id}</FooterLabel>
        <SubmitButton
          onClick={(e) => setView(2)}
          disabled={!!error || amount <= 0}
        >
          Next
        </SubmitButton>
      </Footer>
    </Container>
  );
};

export default Amount;

// CONTAINERS
const Container = styled(ViewContainer)`
  border-top: 3px solid #f7f7f7;
`;
const BalanceContainer = styled(SubViewContainer)`
  width: 160px;
  min-height: 92px;
  margin: 0 auto;
  padding: 24px 0;
`;
const CurrentBalanceContainer = styled(SubViewContainer)`
  flex-direction: row;
  justify-content: center;
  div {
    margin-left: -40px;
  }
`;
const InputContainer = styled(SubViewContainer)`
  margin: 0 auto;
  width: 100%;
  min-height: 160px;
  margin-bottom: 24px;
`;
const MessagesContainer = styled(SubViewContainer)`
  flex-direction: row;
  width: 100%;
  min-height: 24px;
`;
const InputWrapper = styled.div`
  position: relative;
  &:before {
    position: absolute;
    padding: 32px 0px 0px 16px;
    content: '$';
  }
`;

// COMPONENTS
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
const ErrorMessage = styled(Text)`
  color: #dd678a;
  width: 50%;
`;
const RemainingMessage = styled.div`
  width: 50%;
  text-align: right;
`;
