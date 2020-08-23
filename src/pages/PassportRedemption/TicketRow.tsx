import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Button } from "./style";

interface Props {
  stamps: participatingSellerProps[];
  index: number;
  sendEmail: () => void;
};

type participatingSellerProps = {
  created_at: string,
  id: number,
  name: string,
  seller_id: number,
  stamp_url: string,
  updated_at: string,
};
type redeemRowProp = {
  status?: RowStatuses;
};

enum RowStatuses {
  Inactive,
  Active,
  Redeemed
}

const TicketRow = (props: Props) => {
  const [status, setStatus] = useState<RowStatuses>(RowStatuses.Inactive);

  useEffect(() => {
    if(props.stamps.some(stamp => stamp.hasOwnProperty("redeemedAt"))){
      setStatus(RowStatuses.Redeemed);
    } else if (props.stamps.length === 3){
      setStatus(RowStatuses.Active);
    } else {
      setStatus(RowStatuses.Inactive);
    }
  }, [props.stamps])

  return (
    <TableRow key={props.index} status={status}>
      <TableIndex> {props.index + 1} </TableIndex>
      <TableStamp> 
        <StampRow>
          {
            props.stamps.map((ticketInfo) => (
              <>
                { 
                  status === RowStatuses.Active && (
                  <SendEmailButton
                    className="button--red-filled"
                    onClick={props.sendEmail}
                  > 
                    Send to Email
                  </SendEmailButton>
                  )
                }
                <Stamp src={ticketInfo.stamp_url}/>
              </>
            ))
          }
        </StampRow>
        <RedeemedRow status={status}>
          { props.stamps.length < 3 ? `${3 - props.stamps.length} MORE STAMPS UNTIL YOUR NEXT REWARD` : "READY TO REDEEM"}
        </RedeemedRow>
      </TableStamp>
    </TableRow>
  )
}

export default TicketRow;

const TableRow = styled.tr`
  height: 90px;
  border: 2px solid #A5A5A5;
  ${(props: redeemRowProp) => {
    switch(props.status){ 
      case RowStatuses.Redeemed:
        return `
          background: rgba(0, 0, 0, 0.05);
          color: #A5A5A5;
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
  border-right: 2px solid #A5A5A5;
  font-weight: bold;
`;
const TableStamp = styled.td`
  width: 100%;
`;
const StampRow = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 70px;
`
const RedeemedRow = styled.div`
  border-top: 1px dotted #A5A5A5;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  height: 20px;
  ${(props: redeemRowProp) => props.status === RowStatuses.Active && "font-weight: 700;"};
`
const Stamp = styled.img`
  height: 35px;
  width: 60px;
  max-width: 75px;
`;
const SendEmailButton = styled(Button)`
  height: 30px;
  width: 300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  text-transform: uppercase;
`;
