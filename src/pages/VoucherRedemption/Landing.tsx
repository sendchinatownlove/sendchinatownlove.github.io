import React, { useState } from 'react';
import styled from 'styled-components';
import { Divider, Voucher, Bold } from './styles';
import Logo from '../../components/Logos/image/LogoTextDown.png';
import {
  useVoucherState,
  useVoucherDispatch,
} from '../../utilities/hooks/VoucherContext/context';
import { SET_VIEW } from '../../utilities/hooks/VoucherContext/constants';

interface Props {}
interface ButtonProps {
  color?: String;
}
interface VoucherInfoProps {
  showInfo?: Boolean;
}
const LandingCard = (props: Props) => {
  const { voucher } = useVoucherState();
  const dispatch = useVoucherDispatch();
  const [showInfo, setShowInfo] = useState(false);

  const setView = (e) => {
    dispatch({ type: SET_VIEW, payload: 1 });
  };

  return (
    <Container>
      <CardContainer>
        <VoucherContent showInfo={showInfo}>
          {showInfo ? (
            <SubText showInfo={showInfo}>
              <span>
                By proceeding with your purchase, you understand that the
                voucher card is not redeemable for cash and can only be used at
                Shunfa Bakery. All purchases are final. In the event that the
                merchant is no longer open at the time of redemption, Send
                Chinatown Love Inc. will not be able to refund your purchase.
                Balance displayed in the voucher may or may not represent the
                final balance. Final balance information is subject to{' '}
                {voucher.ownerName}'s most recent records.
              </span>
              <MoreInfoButton
                showInfo={showInfo}
                onClick={(e) => setShowInfo(!showInfo)}
              >
                ?
              </MoreInfoButton>
            </SubText>
          ) : (
            <>
              <SubText showInfo={showInfo}>
                Your available balance
                <MoreInfoButton
                  showInfo={showInfo}
                  onClick={(e) => setShowInfo(!showInfo)}
                >
                  ?
                </MoreInfoButton>
              </SubText>
              <Balance>${(voucher.amount / 100).toFixed(2)}</Balance>
              <Voucher>
                Voucher Code: <Bold>{voucher.seller_gift_card_id}</Bold>
              </Voucher>
              <br />
            </>
          )}
        </VoucherContent>
        <Divider showInfo={showInfo} />
        <Button onClick={setView}>Click to begin redeeming your voucher</Button>
        <br />
      </CardContainer>
      <br />
      <Button color="#ab192e">{voucher.locations[0]}</Button>;
      <FooterContainer>
        <Image src={Logo} />
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
  width: 307px;
  margin: 0 auto;
  height: 342px;
  background-color: #ab192e;
  color: white;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  justify-content: space-between;
`;
const SubText = styled.div`
  text-align: center;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  flex-direction: row;
  justify-content: ${(props: VoucherInfoProps) =>
    !props.showInfo ? `center` : `space-between`};
  position: relative;
  showInfo={showInfo}
  color: ${(props: VoucherInfoProps) => (!props.showInfo ? `white` : `black`)};
  span {    
    font-size: 11px;
    text-align: left;
    width: 228px;
    padding-left: 10px;
  }
`;
const VoucherContent = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: -15px;
  border: 1px solid transparent;
  border-radius: 12px;
  padding-top: 5px;
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props: VoucherInfoProps) =>
    props.showInfo ? `white` : `#ab192e`};
`;
const MoreInfoButton = styled.div`
  position: absolute;
  right: 10px;
  border: 1px solid transparent;
  color: ${(props: VoucherInfoProps) => (props.showInfo ? `white` : `#ab192e`)};
  background-color: ${(props: VoucherInfoProps) =>
    props.showInfo ? `#ab192e` : `white`};
  border-radius: 50%;
  width: 25px;
`;
const Button = styled.div`
  cursor: pointer;
  ${(props: ButtonProps) => props.color && `color: ${props.color}`}
  font-size: 13px;
  line-height: 18px;
  text-align: center;
`;
const Balance = styled.div`
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
const FooterContainer = styled.div`
  width: 100%;
  margin: 12px auto;
  background-color: transparent;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
