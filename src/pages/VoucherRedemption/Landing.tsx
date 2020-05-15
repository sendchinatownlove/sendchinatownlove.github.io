import React from 'react';
import styled from 'styled-components';

interface Props {}

const LandingCard = (props: Props) => {
  return (
    <Container>
      <Prompt>
        <span />
        <span>Your available balance</span>
        <span>?</span>
      </Prompt>
      <Balance>$100.00</Balance>
      <Code>
        Voucher Code: <b> AH2-TA</b>
      </Code>
      <NextButton>Click to begin redeeming your voucher</NextButton>
    </Container>
  );
};

export default LandingCard;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  background-color: #ab192e;
  color: white;
  display: flex;
  flex-direction: column;
`;

const Prompt = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Balance = styled.h1``;

const Code = styled.h3``;

const NextButton = styled.div``;
