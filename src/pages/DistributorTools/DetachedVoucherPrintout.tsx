import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import SingleRedemption from '../../components/SingleVoucherRedemption';
import { getDistributor } from '../../utilities/api/interactionManager';

// NOTE(wilsonj806): This voucher printout is NOT connected to any API, and all data needs to be hardcoded
const DetachedVoucherPrintouts = ({ vouchers }) => {
  const [distributor_image, setDistributorImage] = useState('');
  const { distributor_id } = useParams<any>();
  useEffect(() => {
    if (distributor_id) {
      getDistributor(distributor_id).then(({ data }) => {
        setDistributorImage(data.image_url);
      });
    }
  }, [distributor_id]);

  const Vouchers =
    distributor_image && buildVouchers(vouchers, distributor_image);
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
      value: 2000,
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
      value: 2000,
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
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 1440px) {
    width: 1200px;
  }
`;
const PrintoutContainer = styled.div`
  width: 100vw;
  @media print {
    & ${Row}:not(:last-child) {
      margin-bottom: 36px;
    }
  }
`;
// NOTE(wilsonj806): Uncomment for debugging
// Row.displayName = 'Row';

function buildVouchers(vouchers: any[], distributor_image: string) {
  const res: any[] = [];
  let temp;
  for (let i = 0; i < vouchers.length; i++) {
    if (i % 2 !== 0) {
      const curr = vouchers[i];
      const jsx = (
        <Row key={`Row: ${(i + 1) / 2}`}>
          <SingleRedemption
            {...temp}
            key={i - 1}
            distributor_image={distributor_image}
          />
          <SingleRedemption
            {...curr}
            key={i}
            distributor_image={distributor_image}
          />
        </Row>
      );
      res.push(jsx);
    } else {
      temp = vouchers[i];
    }
  }
  return res;
}
