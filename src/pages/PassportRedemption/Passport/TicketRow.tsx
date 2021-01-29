import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import RaffleTicket from '../Assets/RaffleTicket.png';
import CoinIcon from '../Assets/ReceiptIcons/Coin.png';
import GoldIcon from '../Assets/ReceiptIcons/Gold.png';
import MoneyIcon from '../Assets/ReceiptIcons/Money.png';
// import RedEnvIcon from "../Assets/ReceiptIcons/RedEnv.png"

import { Button } from '../style';
// import { Contact } from '../../../utilities/api/types';

// import { dateFormatter } from '../../../utilities/general/textFormatter';
import ScreenType from '../ScreenTypes';

interface Props {
  stamps: participatingSellerProps[];
  index: number;
  setCurrentScreenView: Function;
}

type participatingSellerProps = {
  created_at: string;
  id: number;
  name: string;
  seller_id: number;
  stamp_url: string;
  updated_at: string;
  redeemed_at: string;
  sponsor_seller_id: string;
};
type redeemRowProp = {
  status?: RowStatuses;
};

enum RowStatuses {
  Inactive,
  Active,
  Redeemed,
}

const TicketRow = (props: Props) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<RowStatuses>(RowStatuses.Inactive);
  // const [redeemedOn, setRedeemedOn] = useState('');

  useEffect(() => {
    if (props.stamps.length === 3) {
      if (
        props.stamps.every(
          (stamp) => stamp.redeemed_at && stamp.sponsor_seller_id
        )
      ) {
        // const date = props.stamps[0].redeemed_at;
        // setRedeemedOn(date);
        setStatus(RowStatuses.Redeemed);
      } else {
        setStatus(RowStatuses.Active);
      }
    } else {
      setStatus(RowStatuses.Inactive);
    }
  }, [props.stamps]);

  const showRedeemRow = (status) => {
    switch (status) {
      case RowStatuses.Redeemed:
        return;
      case RowStatuses.Active:
        return t('passport.placeholders.readyToRedeem').toUpperCase();
      default:
        if (props.stamps.length === 0) return;
        return 3 - props.stamps.length === 1
          ? t('passport.placeholders.oneLeftToRedeem')
          : t('passport.placeholders.leftToRedeem', {
              amount: 3 - props.stamps.length,
            });
    }
  };

  const createStamps = (stamps) => {
    const filledStamps = stamps.map((ticketInfo) => {
      const category = props.index % 3;
      let icon;
      switch (category) {
        case 1:
          icon = GoldIcon;
          break;
        case 2:
          icon = MoneyIcon;
          break;
        default:
          icon = CoinIcon;
          break;
      }

      return <Stamp key={ticketInfo.id} src={icon} />;
    });

    while (filledStamps.length < 3) {
      filledStamps.push(
        <EmptyStamp key={'empty stamp' + filledStamps.length} />
      );
    }

    return filledStamps;
  };

  const redeemRaffleTicket = (e) => {
    e.preventDefault();
    props.setCurrentScreenView(ScreenType.Rewards);
  };

  return (
    <TableRow key={props.index}>
      {status === RowStatuses.Redeemed && (
        <RedeemedRowOverlay status={status}>
          <img src={RaffleTicket} alt="RaffleTicket" />
          <span>{t('passport.labels.enteredGiveAway').toUpperCase()}</span>
        </RedeemedRowOverlay>
      )}
      {status === RowStatuses.Active && (
        <RedeemedRowOverlay status={status}>
          <span>{t('passport.labels.earnedYourTicket').toUpperCase()}</span>
          <RedeemRaffleTicketButton onClick={redeemRaffleTicket}>
            {t('passport.placeholders.useTicket').toUpperCase()}
          </RedeemRaffleTicketButton>
        </RedeemedRowOverlay>
      )}
      <TableIndex> {props.index + 1} </TableIndex>
      <TableStamp>
        <StampColumn>
          <StampRow>{!!props.stamps && createStamps(props.stamps)}</StampRow>
        </StampColumn>
        <RedeemedRow>{showRedeemRow(status)}</RedeemedRow>
      </TableStamp>
    </TableRow>
  );
};

export default TicketRow;

const TableRow = styled.tr`
  width: 100%;
  height: 90px;
  display: flex;
  border: 2px solid rgb(248, 186, 23);
  border-width: 1px 2px;
  position: relative;
  color: rgb(248, 186, 23);
`;
const TableIndex = styled.td`
  display: flex;
  width: 40px;
  height: 90px;
  text-align: center;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12px;
  border-right: 2px solid rgb(248, 186, 23);
  font-weight: bold;
`;
const TableStamp = styled.td`
  width: 100%;
  position: relative;
  padding: 0;
`;
const StampColumn = styled.div`
  position: relative;
  width: 100%;
  height: 65px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const StampRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 80%;
  height: 100%;
`;
const RedeemedRow = styled.div`
  border-top: 1px dotted #f8ba17;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 5px;
  font-size: 10px;
  height: 25px;
  text-transform: uppercase;
  font-weight: 700;
`;
const RedeemedRowOverlay = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 88px;
  background: rgba(168, 25, 46, 0.8);
  z-index: 10;

  padding: ${(props: redeemRowProp) =>
    props.status === RowStatuses.Active ? '0' : '0 5%'};
  span {
    color: white;
    font-weight: bold;
  }
  img {
    width: 65px;
    margin-right: 16px;
  }

  display: flex;
  align-items: center;
  flex-direction: ${(props: redeemRowProp) =>
    props.status === RowStatuses.Active ? 'column' : 'row'};
  justify-content: center;
`;
const Stamp = styled.img`
  width: 45px;
`;
const EmptyStamp = styled.div`
  width: 55px;
`;
const RedeemRaffleTicketButton = styled(Button)`
  padding: 0;
  height: 35px;
  width: 300px;
  margin: 0 auto;
  margin-top: 10px;
  align-items: center;
  text-align: center;
  z-index: 100;
  background: #ffffff !important;

  border: 1.5px solid #a8192e;
  color: #a8192e;
  box-sizing: border-box;
  border-radius: 50px;

  font-size: 12px;
  line-height: 16px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.15));
`;
