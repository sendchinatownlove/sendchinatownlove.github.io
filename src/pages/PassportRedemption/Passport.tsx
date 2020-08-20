import React, {useState} from 'react';
import styled from 'styled-components';

import { PassportContainer, Title, SubTitle, Button, Container } from "./style";
import ScreenName from "./ScreenName";

interface Props {
  setCurrentScreenView: Function;
};

type redeemRowProp = {
  status?: string;
};
type stampProp = {
  sellerId: string;
};

const initStamps = [1,2,3,4,5,6,7,9];
const Passport = ({ setCurrentScreenView }: Props) => {
  const [stamps, setStamps] = useState(initStamps);

  const createRow = (info,index) => {
    const dummyInfo = {
      id: 1,
      contact_id: 12,
      ticket_id: 123,
      participating_seller_id: "WOK WOK",
      sponsor_seller_id: "WOK WOK",
      redeemed_at: "9/1/20",
      expiration: "9/20/20"
    }
    

    return (
      <TableRow key={index} status="active">
        <TableIndex> {index + 1} </TableIndex>
        <TableStamp> 
          <StampRow>
            <Stamp sellerId={dummyInfo.participating_seller_id}>
              {dummyInfo.participating_seller_id}
            </Stamp>
            <Stamp sellerId="CONGEE VILLAGE">
              CONGEE VILLAGE
            </Stamp>
            <Stamp sellerId="46 MOTT">
              46 MOTT
            </Stamp>
          </StampRow>
          <RedeemedRow status="active">
            2 MORE STAMPS UNTIL YOUR NEXT REWARD
          </RedeemedRow>
        </TableStamp>
      </TableRow>
    ) 
  }
  return (
    <PassportContainer>
      <TitleRow>
        <Title>PASSPORT TO CHINATOWN</Title>
        <SubTitle>9/1/20202 - 9/30/20</SubTitle>
      </TitleRow>
      
      <Table>
        {stamps.length && stamps.map((stamp, index) => createRow(stamp,index))}
      </Table>
        
      <AddNewTicket
        value="track-screen-button"
        className="button--filled"
        onClick={() => setCurrentScreenView(ScreenName.Dashboard)}
      >
        Add New Ticket
      </AddNewTicket>
    </PassportContainer>
  );
};

export default Passport;

const TitleRow = styled.div`
  text-align: center;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 12px;
`;
const TableRow = styled.tr`
  height: 90px;
  border: 2px solid #A5A5A5;
  ${(props: redeemRowProp) => {
    switch(props.status){ 
      case "redeemed": 
        return `
          background: rgba(0, 0, 0, 0.05);
          color: #A5A5A5;
        `;
      case "active":
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
const AddNewTicket = styled(Button)`
  position: fixed;
  bottom: 10px;
`
const StampRow = styled.div`
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
  ${(props: redeemRowProp) => props.status === "active" && "font-weight: 700;"};
`
const Stamp = styled.div`
  font-size: 10px;
  height: 35px;
  width: 60px;
  padding: 5px;
  ${(props: stampProp) => props.sellerId.length < 12 && `
    border-radius: 50%;
    height: 50px;
    width: 50px;    
  `}
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 75px;
  text-align: center;
  border: 2px solid #A8192E;
  color: #A8192E;
`;