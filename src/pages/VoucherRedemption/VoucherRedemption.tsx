import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Landing from './Landing';
import Amount from './Amount';
import Confirm from './Confirm';
import Complete from './Complete';
import {
  useVoucherState,
  useVoucherDispatch,
  VoucherConstants,
} from '../../utilities/hooks/VoucherContext';
import Loader from '../../components/Loader';
import NYCBackdrop from '../../images/nyc-background.png';
import { getVoucher, getSeller } from '../../utilities/api/interactionManager';
import { getLocationInfo } from '../../utilities/hooks/helpers';

interface Props {}
interface ContainerProps {
  view: Number;
}

const VoucherRedemption = (props: Props) => {
  const { view } = useVoucherState(null);
  const dispatch = useVoucherDispatch(null);
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
        storeImage: merchantData.data.hero_image_url,
        storeName: merchantData.data.name,
        sellerID: seller_id,
        location: getLocationInfo(merchantData),
      };
      dispatch({ type: VoucherConstants.SET_VOUCHER_INFO, payload: voucher });
      setLoading(false);
    } catch (e) {
      console.log('error: ' + JSON.stringify(e));
      params.push('/');
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    // eslint-disable-next-line
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
    <Container view={view}>
      {loading ? (
        <Loader isPage={true} />
      ) : (
        <>
          {showView()}
          {/* {view === 0 && <Backdrop src={NYCBackdrop}/>} */}
        </>
      )}
    </Container>
  );
};

export default VoucherRedemption;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  ${(props: ContainerProps) =>
    props.view === 0 &&
    `
    background-image: url(${NYCBackdrop});
    background-size: 1780.75px 905px;
  `}
  background-color: transparent;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;
