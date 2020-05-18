import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Landing from './Landing';
import Amount from './Amount';
import Confirm from './Confirm';
import Complete from './Complete';
import StoreBanner from './StoreBanner';
import {
  useVoucherState,
  useVoucherDispatch,
} from '../../utilities/hooks/VoucherContext/context';
import { SET_VOUCHER_INFO } from '../../utilities/hooks/VoucherContext/constants';
import Loader from '../../components/Loader';

import { getVoucher, getSeller } from '../../utilities/api/interactionManager';

interface Props {}

const VoucherRedemption = (props: Props) => {
  const { view, voucher } = useVoucherState();
  const dispatch = useVoucherDispatch();
  const params = useHistory();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const {
        data: { gift_card_detail, seller_id },
      } = await getVoucher(params.location.pathname.replace('/voucher/', ''));
      const merchantData = await getSeller(seller_id);

      const voucher = {
        ...gift_card_detail,
        ownerName: merchantData.data.owner_name,
        ownerImage: merchantData.data.owner_image_url,
        sellerID: seller_id,
        locations: merchantData.data.locations,
      };

      dispatch({ type: SET_VOUCHER_INFO, payload: voucher });
      setLoading(false);
    } catch {
      params.push('/');
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const showView = () => {
    switch (view) {
      case 1:
        return <Amount />;
      case 2:
        return <Confirm />;
      case 3:
        return <Complete />;
      default:
        return <Landing />;
    }
  };
  return (
    <Container>
      {loading && voucher.sellerID.length > 1 ? (
        <Loader isPage={true} />
      ) : (
        <>
          <StoreBanner />
          {showView()}
        </>
      )}
    </Container>
  );
};

export default VoucherRedemption;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: white;
  flex-direction: column
  height: 100%;
`;
