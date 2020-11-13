import React from 'react';
import styled from 'styled-components';

import SingleRedemption from './SingleRedemption';

// NOTE(wilsonj806): This voucher printout is NOT connected to any API, and all data needs to be hardcoded
const DetachedVoucherPrintouts = ({ vouchers }) => {
  const Vouchers = buildVouchers(vouchers);
  return <PrintoutContainer>{Vouchers}</PrintoutContainer>;
};

export default DetachedVoucherPrintouts;

DetachedVoucherPrintouts.defaultProps = {
  vouchers: [
    {
      name: 'Lanzhou Ramen',
      cn_name: '兰州拉面',
      voucher_code: 'AH2-TA',
      address1: '107 E Broadway',
      city: 'New York',
      state: 'NY',
      zip_code: '10002',
      qr_url: '',
      value: 20,
      expiration_date: '12/32/2020',
    },
    {
      name: 'Lanzhou Ramen',
      cn_name: '兰州拉面',
      voucher_code: 'AH2-TA',
      address1: '107 E Broadway',
      city: 'New York',
      state: 'NY',
      zip_code: '10002',
      qr_url: '',
      value: 20,
      expiration_date: '12/32/2020',
    },
    {},
    {},
    {},
    {},
    {},
    {},
  ],
};
const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PrintoutContainer = styled.div`
  width: 100%;
  @media print {
    & ${Row}:not(:last-child) {
      margin-bottom: 36px;
    }
  }
`;

Row.displayName = 'Row';

function buildVouchers(vouchers: any[]) {
  const res: any[] = [];
  let temp;
  for (let i = 0; i < vouchers.length; i++) {
    if (i % 2 !== 0) {
      const curr = vouchers[i];
      const jsx = (
        <Row>
          <SingleRedemption {...temp} />
          <SingleRedemption {...curr} />
        </Row>
      );
      res.push(jsx);
    } else {
      temp = vouchers[i];
    }
  }
  return res;
}
