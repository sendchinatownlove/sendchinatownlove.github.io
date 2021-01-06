import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Coin1 from "../Assets/Coins/Coin1.png";
// import Coin2 from "../Assets/Coins/Coin2.png";
// import Coin3 from "../Assets/Coins/Coin3.svg";
import { useTranslation } from 'react-i18next';

import { dateFormatter } from '../../../utilities/general/textFormatter';

interface Props {
  stamps: participatingSellerProps[];
  index: number;
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
  const [redeemedOn, setRedeemedOn] = useState('');

  useEffect(() => {
    if (props.stamps.length === 3) {
      if (
        props.stamps.every(
          (stamp) => stamp.redeemed_at && stamp.sponsor_seller_id
        )
      ) {
        const date = props.stamps[0].redeemed_at;
        setRedeemedOn(date);
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
        return t('passport.placeholders.prizeRedeemed', {
          date: dateFormatter(redeemedOn),
        });
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
    const filledStamps = stamps.map((ticketInfo) => (
      <Stamp key={ticketInfo.id} src={ticketInfo.stamp_url} />
    ));

    while (filledStamps.length < 3) {
      filledStamps.push(<EmptyStamp />);
    }

    return filledStamps;
  };

  return (
    <tr>
    <TableRow key={props.index} >
      {status === RowStatuses.Redeemed && (
        <RedeemedRowOverlay>
          <img src={Coin1} alt='coin1'/>
          <span>
            {t('passport.labels.enteredGiveAway')}
          </span>
        </RedeemedRowOverlay>
      )}
      <TableIndex> {props.index + 1} </TableIndex>
      <TableStamp>
        <StampColumn>
          <StampRow>{!!props.stamps && createStamps(props.stamps)}</StampRow>
        </StampColumn>
        { status !== RowStatuses.Redeemed && <RedeemedRow status={status}>{showRedeemRow(status)}</RedeemedRow>}
      </TableStamp>
    </TableRow>
    </tr>
  );
};

export default TicketRow;

const TableRow = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  border: 2px solid rgb(248,186,23);
  border-width: 1px 2px;
  position: relative;
  color: rgb(248,186,23);
`;
const TableIndex = styled.td`
  display: flex;
  width: 40px;
  height: 90px;
  text-align: center;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12px;
  border-right: 2px solid rgb(248,186,23);
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
  border-top: 1px dotted rgb(248,186,23); 
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
  ${(props: redeemRowProp) =>
    props.status === RowStatuses.Active && 'font-weight: 700;'};
`;
const RedeemedRowOverlay = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 88px;
  background: rgba(168,25,46,0.7);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  span {
    color: white;
    font-size: 16px;
    font-weight: bold;
    width: 75%;
  }
  img {
    width: 65px;
  }
`;
const Stamp = styled.img`
  width: 55px;
`;
const EmptyStamp = styled.div`
  width: 55px;
`;