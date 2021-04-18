import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import SingleRedemption from '../../components/SingleVoucherRedemption';
import { getAllVouchers } from '../../utilities/api/interactionManager';

const DetachedVoucherPrintouts = () => {
  const [isLoading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [distributor, setDistributor] = useState<{ [key: string]: any }>({});
  const [vouchers, setVouchers] = useState<
    { [key: string]: any }[] | undefined
  >(undefined);
  useEffect(() => {
    const asyncFetch = async () => {
      setLoading(true);
      const {
        status,
        data: { gift_cards, seller_names, distributor },
      } = await getAllVouchers();
      if (status === 401) return setShouldRedirect(true);

      const processed = gift_cards.map((gift_card) => ({
        ...gift_card,
        name: seller_names[gift_card.id] ? seller_names[gift_card.id].en : '',
      }));
      setVouchers(processed);
      setDistributor(distributor);
      setLoading(false);
    };
    if (vouchers) return;
    asyncFetch();
  }, [vouchers]);

  const Vouchers =
    vouchers &&
    distributor.image_url &&
    buildVouchers(vouchers, distributor.image_url);
  return (
    <PrintoutContainer>
      {shouldRedirect && <Redirect to="/distributor/login" />}
      {isLoading
        ? 'LOADING...'
        : Vouchers
        ? Vouchers
        : 'NO VOUCHERS TO DISPLAY'}
    </PrintoutContainer>
  );
};

export default DetachedVoucherPrintouts;

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
