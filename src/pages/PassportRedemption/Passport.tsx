import React, {useState} from 'react';
import styled from 'styled-components';

import { PassportContainer, Title, SubTitle, Button, ErrorMessage } from "./style";

interface Props {
  setCurrentScreenView: Function;
};

const initStamps = [1,2,3,4,5,6,7,9];
const Passport = ({ setCurrentScreenView }: Props) => {
  const [stamps, setStamps] = useState(initStamps);

  const createRow = (info,index) => {
    return (
      <TableRow key={index}>
        <TableIndex> {index + 1} </TableIndex>
        <TableStamp> {info} </TableStamp>
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
        onClick={() => setCurrentScreenView(1)}
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
`;
const TableStamp = styled.td`
  width: 100%;
`;
const AddNewTicket = styled(Button)`
  position: fixed;
  bottom: 10px;
`
