import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from './style';
import { dateFormatter } from '../../utilities/general/textFormatter';

interface Props {
  stamps: participatingSellerProps[];
  index: number;
  sendEmail: () => void;
}

type participatingSellerProps = {
  created_at: string;
  id: number;
  name: string;
  seller_id: number;
  stamp_url: string;
  updated_at: string;
  redeemed_at: string;
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
  const [status, setStatus] = useState<RowStatuses>(RowStatuses.Inactive);
  const [redeemedOn, setRedeemedOn] = useState('');

  useEffect(() => {
    if (props.stamps.some((stamp) => stamp.redeemed_at)) {
      const date = props.stamps.find((stamp) => !!stamp.redeemed_at);
      if (!!date) setRedeemedOn(date.redeemed_at);
      setStatus(RowStatuses.Redeemed);
    } else if (props.stamps.length === 3) {
      setStatus(RowStatuses.Active);
    } else {
      setStatus(RowStatuses.Inactive);
    }
  }, [props.stamps]);

  const showRedeemRow = (status) => {
    switch (status) {
      case RowStatuses.Redeemed:
        return `PRIZE REDEEMED ${dateFormatter(redeemedOn)}`;
      case RowStatuses.Active:
        return `READY TO REDEEM`;
      default:
        if (props.stamps.length === 0) return;
        return `${3 - props.stamps.length} MORE ${
          3 - props.stamps.length > 1 ? 'STAMPS' : 'STAMP'
        }  UNTIL YOUR NEXT REWARD`;
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
    <TableRow key={props.index} status={status}>
      <TableIndex> {props.index + 1} </TableIndex>
      <TableStamp>
        <StampColumn>
          {status === RowStatuses.Active && (
            <SendEmailButton
              className="button--red-filled"
              onClick={props.sendEmail}
            >
              Send to Email
            </SendEmailButton>
          )}
          <StampRow>{!!props.stamps && createStamps(props.stamps)}</StampRow>
        </StampColumn>
        <RedeemedRow status={status}>{showRedeemRow(status)}</RedeemedRow>
      </TableStamp>
    </TableRow>
  );
};

export default TicketRow;

const TableRow = styled.tr`
  height: 90px;
  border: 2px solid #a5a5a5;
  ${(props: redeemRowProp) => {
    switch (props.status) {
      case RowStatuses.Redeemed:
        return `
          opacity: 0.75;
          background: rgba(0, 0, 0, 0.05);
        `;
      case RowStatuses.Active:
        return `
          background: rgba(168, 25, 46, 0.05);
          color: #A8192E;
        `;
      default:
        return `
          background: rgba(0, 0, 0, 0);
          color: black;
        `;
    }
  }};
`;
const TableIndex = styled.td`
  display: flex;
  width: 40px;
  height: 90px;
  text-align: center;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12px;
  border-right: 2px solid #a5a5a5;
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
  height: 70px;

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
  border-top: 1px dotted #a5a5a5;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  height: 20px;
  ${(props: redeemRowProp) =>
    props.status === RowStatuses.Active && 'font-weight: 700;'};
`;
const Stamp = styled.img`
  width: 55px;
`;
const EmptyStamp = styled.div`
  width: 55px;
`;
const SendEmailButton = styled(Button)`
  padding: 0;
  height: 25px;
  width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  position: absolute;

  font-weight: bold;
  font-size: 11px;
  line-height: 15px;
  align-items: center;
  text-align: center;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;
