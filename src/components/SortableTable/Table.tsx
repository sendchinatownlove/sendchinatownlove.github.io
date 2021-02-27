import React, { useState } from 'react';
import styled from 'styled-components';
import MuiTable from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableCell from '@material-ui/core/TableCell';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

const FIELDS = [
  { name: 'name', display_name: 'Merchant Name 结余' },
  { name: 'value', display_name: 'Voucher Amount 购买金额' },
  { name: 'expiration', display_name: 'Expiration Date 购买日期' },
  { name: 'seller_gift_card_id', display_name: 'Voucher Code 礼品券号码' },
];

const SortButton = ({ sortFn, ind }) => (
  <IconButton type="button" onClick={() => sortFn(ind)}>
    <KeyboardArrowDown />
  </IconButton>
);

const HeaderEntries = ({ fields }) => {
  return (
    <TableHead>
      <TableRow>
        {fields.map(({ display_name, name }, i) => (
          <TableCell key={name}>
            {display_name}
            <SortButton ind={i} sortFn={() => console.log('hi')} />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
// TODO IF MONEY FORMAT MONEY
const PopulatedTableRow = ({ row, fields }) => {
  return (
    <TableRow>
      {fields.map((field) => (
        <TableCell key={field.name}>{`${row[field.name] || 'N/A'}`}</TableCell>
      ))}
    </TableRow>
  );
};

const SortableMuiTable = ({ fields, data, sortFn }) => {
  return (
    <>
      <Table>
        <HeaderEntries fields={fields} />
        <MuiTableBody>
          {data.length > 0
            ? data.map((row, i) => (
                <PopulatedTableRow row={row} key={`row-${i}`} fields={fields} />
              ))
            : null}
        </MuiTableBody>
      </Table>
    </>
  );
};

export default SortableMuiTable;
export { FIELDS };

const IconButton = styled.button`
  background: none;
  border: 1px;
`;

const Table = styled(MuiTable)`
  width: 100%;
`;

const TableHead = styled(MuiTableHead)`
  background: rgb(247, 247, 247);
  height: 92px;
`;

const TableRow = styled(MuiTableRow)``;

const TableCell = styled(MuiTableCell)`
  max-width: 150px;
`;
