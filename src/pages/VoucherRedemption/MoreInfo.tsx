import React, { useState } from 'react';
import styled from 'styled-components';
import { useVoucherState } from '../../utilities/hooks/VoucherContext/context';

interface Props {
  showShadow?: Boolean;
  marginLeft?: string;
  inverted?: Boolean;
}
interface VoucherInfoProps {
  showInfo?: Boolean;
  showShadow?: Boolean;
  marginLeft?: string;
  inverted?: Boolean;
}
const LandingCard = (props: Props) => {
  const { voucher } = useVoucherState();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <VoucherContent
      showInfo={showInfo}
      showShadow={props.showShadow}
      marginLeft={props.marginLeft}
    >
      {showInfo && (
        <SubText showInfo={showInfo}>
          By proceeding with your purchase, you understand that the voucher card
          is not redeemable for cash and can only be used at Shunfa Bakery. All
          purchases are final. In the event that the merchant is no longer open
          at the time of redemption, Send Chinatown Love Inc. will not be able
          to refund your purchase. Balance displayed in the voucher may or may
          not represent the final balance. Final balance information is subject
          to {voucher.ownerName}'s most recent records.
        </SubText>
      )}
      <MoreInfoButton
        showInfo={showInfo}
        inverted={props.inverted}
        onClick={(e) => setShowInfo(!showInfo)}
      >
        ?
      </MoreInfoButton>
    </VoucherContent>
  );
};

export default LandingCard;

const getColor = (foreground: Boolean, showInfo?: Boolean, inverted?: Boolean): string => {
  const white = 'white';
  const red = '#ab192e';

  if (!inverted) {
    if (foreground) {
      return !showInfo ? red : white;
    }
    else {
      return !showInfo ? white : red;
    }
  } else {
    if (foreground) {
      return white;
    }
    else {
      return red;
    }
  }
};

const VoucherContent = styled.div`
  z-index: 150 !important;
  width: 285px;
  position: absolute;
  margin: 0 auto;
  border: 1px solid transparent;
  border-radius: 12px;
  margin-top: -7.5px;
  padding-top: 5px;
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props: VoucherInfoProps) =>
    props.showInfo ? `white` : `transparent`};
  ${(props: VoucherInfoProps) =>
    props.showInfo &&
    props.showShadow &&
    'box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);'};
  ${(props: VoucherInfoProps) =>
    props.marginLeft && `margin-left: ${props.marginLeft}`};
`;
const SubText = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: ${(props: VoucherInfoProps) =>
    !props.showInfo ? `center` : `space-between`};
  color: ${(props: VoucherInfoProps) => (!props.showInfo ? `white` : `black`)};
  font-size: 11px;
  text-align: left;
  line-height: 20px;
  width: 228px;
  padding-left: 10px;
`;
const MoreInfoButton = styled.div`
  position: absolute;
  right: 10px;
  border: 1px solid transparent;
  color: ${(props: VoucherInfoProps) =>
    getColor(true, props.showInfo, props.inverted)};
  background-color: ${(props: VoucherInfoProps) =>
    getColor(false, props.showInfo, props.inverted)};
  border-radius: 50%;
  width: 25px;
  text-align: center;
`;
