import React, { useState } from 'react';
import styled from 'styled-components';
import MuiTable from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableCell from '@material-ui/core/TableCell';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

import { formatCurrency } from '../../utilities/general/textFormatter';

const FIELDS = [
  { name: 'name', display_name: 'Merchant Name 结余' },
  { name: 'value', display_name: 'Voucher Amount 购买金额' },
  { name: 'expiration', display_name: 'Expiration Date 购买日期' },
  { name: 'seller_gift_card_id', display_name: 'Voucher Code 礼品券号码' },
];

const SortButton = ({ sortFn, ind, setActive, activeCol }) => {
  const [isAsc, setIsAsc] = useState(true);
  const handleClick = (e) => {
    setActive(ind);
    setIsAsc(!isAsc);
    sortFn(ind, isAsc);
  };
  const isActive = activeCol === ind;
  return (
    <IconButton
      type="button"
      onClick={handleClick}
      isActive={isActive ? 'active' : 'not-active'}
    >
      {isAsc || !isActive ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
    </IconButton>
  );
};

const HeaderEntries = ({ fields, sortFn }) => {
  const [activeCol, setActiveCol] = useState(-1);
  const setActive = (ind) => setActiveCol(ind);
  return (
    <TableHead>
      <TableRow>
        {fields.map(({ display_name, name }, i) => (
          <TableCell key={name}>
            {display_name}
            <SortButton
              ind={i}
              sortFn={sortFn}
              setActive={setActive}
              activeCol={activeCol}
            />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

// TableCell either renders the English name, a monetary value, any other potential values, or N/A if there's nothing
// Conditional will not scale if there's any more wildly different fields than the current ones
const PopulatedTableRow = ({ row, fields, enName }) => {
  return (
    <TableRow>
      {fields.map((field) => (
        <TableCell key={field.name}>{`${
          field.name === 'name'
            ? enName
            : field.name === 'value'
            ? formatCurrency(row[field.name])
            : row[field.name]
            ? row[field.name]
            : 'N/A'
        }`}</TableCell>
      ))}
    </TableRow>
  );
};

const SortableMuiTable = ({ fields, data, sortFn, sellersList }) => {
  return (
    <>
      <Table>
        <HeaderEntries fields={fields} sortFn={sortFn} />
        <MuiTableBody>
          {data.length > 0
            ? data.map((row, i) => (
                <PopulatedTableRow
                  row={row}
                  key={`row-${i}`}
                  fields={fields}
                  enName={sellersList[row.id] ? sellersList[row.id].en : ''}
                />
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
  --not-active: rgb(158, 158, 158);
  --active: rgb(168, 25, 46);
  ${({ isActive }: { isActive: string }) => `color: var(--${isActive})`}
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
