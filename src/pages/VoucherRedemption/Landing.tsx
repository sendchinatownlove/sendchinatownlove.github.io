import React from 'react';
import styled from 'styled-components';
import StoreBanner from './StoreBanner';
import { Logo } from '../../components/Logos';
import { useVoucherDispatch } from '../../utilities/hooks/VoucherContext/context';
import { SET_VIEW } from '../../utilities/hooks/VoucherContext/constants';

interface Props {}
interface ButtonProps {
  color?: String;
}

const LandingCard = (props: Props) => {
  const dispatch = useVoucherDispatch();

  const setView = (e) => {
    dispatch({ type: SET_VIEW, payload: 1 });
  };

  return (
    <Container>
      <StoreBanner />
      <CardContainer>
        <SubText>
          Your available balance
          <span>?</span>
        </SubText>
        <Balance>$100.00</Balance>
        <Code>
          Voucher Code: <b> AH2-TA</b>
        </Code>
        <Divider />
        <Button onClick={setView}>Click to begin redeeming your voucher</Button>
      </CardContainer>
      <br />
      <Button color="#ab192e">
        6221 Fort Hamilton Pkwy, Brooklyn, NY 11219
      </Button>
      ;
      <FooterContainer>
        <Logo />
      </FooterContainer>
    </Container>
  );
};

export default LandingCard;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const CardContainer = styled.div`
  width: 90%;
  max-width: 320px;
  margin: 0 auto;
  min-height: 350px;
  background-color: #ab192e;
  color: white;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
`;

const SubText = styled.div`
  width: 90%;
  margin: 12px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  span {
    justify-self: flex-end;
    margin: 12px;
  }
`;

const Button = styled(SubText)`
  cursor: pointer;
  ${(props: ButtonProps) => props.color && `color: ${props.color}`}
`;

const Balance = styled.h1`
  font-weight: 700;
  font-size: 50px;
  margin: 24px auto;
`;

const Code = styled.h3`
  margin: 12px auto;
`;

const Divider = styled.div`
  border-bottom: 2px solid white;
  margin: 12px auto;
  width: 90%;
`;

const FooterContainer = styled.div`
  width: 100%;
  margin: 12px auto;
  background-color: white;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
