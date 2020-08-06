import React from 'react';
import styled from 'styled-components';
import Logo from '../../components/Logos/image/LogoTextDown.png';
import MoreInfo from './MoreInfo';
import StoreBanner from './StoreBanner';
import {
  useVoucherState,
  useVoucherDispatch,
  VoucherConstants,
} from '../../utilities/hooks/VoucherContext';
import { ViewContainer, SubViewContainer, Text } from './style';

interface Props {}

const LandingCard = (props: Props) => {
  const { voucher } = useVoucherState(null);
  const dispatch = useVoucherDispatch(null);
  const setView = () => {
    if (voucher.single_use) {
      dispatch({
        type: VoucherConstants.SET_AMOUNT,
        payload: voucher.amount / 100,
      });
      dispatch({ type: VoucherConstants.SET_VIEW, payload: 2 });
    } else {
      dispatch({ type: VoucherConstants.SET_VIEW, payload: 1 });
    }
  };

  return (
    <MainViewContainer>
      <StoreBanner />
      <CardContainer onClick={setView}>
        <VoucherContent>
          <SubText>
            <SupportingText>
              {voucher.single_use
                ? 'Single-use voucher balance'
                : 'Your available balance'}
            </SupportingText>
            <MoreInfo />
          </SubText>
          <Balance>${(voucher.amount / 100).toFixed(2)}</Balance>
        </VoucherContent>
        <CardFooter>
          <VoucherCode>Voucher Code: {voucher.seller_gift_card_id}</VoucherCode>
          <Divider />
          <Button>Click to begin redeeming your voucher</Button>
          <br />
        </CardFooter>
      </CardContainer>
      <br />
      <Button>
        {voucher.location.line1}
        <br></br>
        {voucher.location.line2}
      </Button>
      <Footer>
        <Image src={Logo} />
      </Footer>
    </MainViewContainer>
  );
};

export default LandingCard;

const MainViewContainer = styled(ViewContainer)`
  height: 100vh;
`;
const CardContainer = styled(SubViewContainer)`
  padding-top: 5px;
  width: 307px;
  margin: 0 auto;
  min-height: 342px;
  background-color: #ab192e;
  color: white;
  border-radius: 15px;
  justify-content: space-between;
`;
const VoucherContent = styled(SubViewContainer)`
  width: 90%;
  padding-top: 5px;
  margin: 0 auto;
  justify-content: space-between;
  min-height: 150px;
`;
const CardFooter = styled(SubViewContainer)`
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
  min-height: 130px;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 175px;
  text-align: center;
  margin: 16px auto;
`;
const SubText = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
`;
const SupportingText = styled.span`
  z-index: 100 !important;
`;
const Divider = styled.div`
  width: 90%;
  margin: 10px auto;
  border-top: white 2px solid;
`;
const Button = styled.div`
  cursor: pointer;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  min-height: 75px;
  align-items: center;
`;
const Balance = styled.div`
  z-index: 0 !important;
  font-weight: 600;
  font-size: 50px;
  line-height: 68px;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
`;
const Image = styled.img`
  width: 75px;
`;
const VoucherCode = styled(Text)`
  word-break: break-all;
`;
