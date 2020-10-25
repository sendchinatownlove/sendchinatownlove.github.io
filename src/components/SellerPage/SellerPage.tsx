import React, { useEffect, useState } from 'react';
import { StoreInfo } from '../StoreInfo';
import OwnerPanel from '../OwnerPanel';
import ErrorPage from '../404Page';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
  ModalPaymentConstants,
} from '../../utilities/hooks/ModalPaymentContext';
import {
  getSeller,
  getSellerHours,
  getSellerDeliveryOptions,
} from '../../utilities';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import ReactPixel from 'react-facebook-pixel';

interface Props {
  menuOpen: boolean;
  showAltLayout: boolean;
}

ReactPixel.trackCustom('SellerPageView', {});
const SellerPage = (props: Props) => {
  const { i18n } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<any>();

  const dispatch = useModalPaymentDispatch(null);
  const { sellerData } = useModalPaymentState(null);
  const [sellerHours, setSellerHours] = useState<any[]>([]);
  const [isMerchantOpen, setIsMerchantOpen] = useState(false);
  const [deliveryServices, setDeliveryServices] = useState<any[]>([]);

  const buildWeeklyHours = (hours: any[] = []) => {
    const dayEnum = {
      SUN: 0,
      MON: 1,
      TUE: 2,
      WED: 3,
      THU: 4,
      FRI: 5,
      SAT: 6,
    };

    const copy = [...hours].sort((a, b) => {
      if (dayEnum[a.open_day] > dayEnum[b.open_day]) {
        return 1;
      } else {
        return -1;
      }
    });
    const res = [
      { open_day: 'Sun' },
      { open_day: 'Mon' },
      { open_day: 'Tue' },
      { open_day: 'Wed' },
      { open_day: 'Thu' },
      { open_day: 'Fri' },
      { open_day: 'Sat' },
    ];
    if (copy.length === 0) {
      return copy;
    }
    for (let i = 0; i < copy.length; i++) {
      const ind: number = dayEnum[copy[i].open_day];
      res[ind] = { ...copy[i], open_day: res[ind].open_day };
    }
    return res;
  };

  const findIfOpen = (hours: any[] = []): boolean => {
    const rightNow = new Date();
    const day = rightNow.getDay();

    if (hours.length === 0 || !hours[day].open_time) {
      return false;
    }
    const hourRightNow = rightNow.getHours();
    const minRightNow = rightNow.getMinutes();

    const openHr = parseInt(hours[day].open_time.slice(11, 13));
    const closeHr = parseInt(hours[day].close_time.slice(11, 13));

    if (hourRightNow === openHr) {
      const openMin = parseInt(hours[day].open_time.slice(14, 16));

      return minRightNow >= openMin ? true : false;
    } else if (hourRightNow === closeHr) {
      const closeMin = parseInt(hours[day].close_time.slice(14, 16));

      return minRightNow <= closeMin ? true : false;
    }

    if (hourRightNow > openHr && hourRightNow < closeHr) {
      return true;
    } else if (hourRightNow < openHr || hourRightNow > closeHr) {
      return false;
    }
    return false;
  };

  useEffect(() => {
    if (id) fetchData(i18n.language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, i18n.language]);

  const fetchData = async (lang?) => {
    setLoading(true);
    const result = id && (await getSeller(id, lang));
    dispatch({
      type: ModalPaymentConstants.SET_SELLER_DATA,
      payload: result.data,
    });
    const { data: hours } = await getSellerHours(id);
    const weeklyHours = buildWeeklyHours(hours);
    setSellerHours(weeklyHours);
    const checkHours = findIfOpen(weeklyHours);
    setIsMerchantOpen(checkHours);

    const { data } = await getSellerDeliveryOptions(id);
    setDeliveryServices(data);

    setLoading(false);
  };

  return sellerData && !loading ? (
    <Container {...props}>
      {props.showAltLayout && <SellerName>{sellerData.name}</SellerName>}
      <ContentContainer>
        {/* TODO(ArtyEmsee): Fix object mapping */}
        <StoreInfo
          seller={sellerData}
          sellerHours={sellerHours}
          isMerchantOpen={isMerchantOpen}
          deliveryService={deliveryServices}
        />
        <OwnerPanel
          seller={sellerData}
          sellerHours={sellerHours}
          isMerchantOpen={isMerchantOpen}
          deliveryService={deliveryServices}
          showAltLayout={props.showAltLayout}
        />
      </ContentContainer>
    </Container>
  ) : (
    <>
      {loading ? (
        <Loader isPage={true} />
      ) : (
        <ErrorPage menuOpen={props.menuOpen} />
      )}
    </>
  );
};

export default SellerPage;

const Container = styled.div`
  background: white;
  max-width: 1440px;
  margin: 0 auto;
  width: 90%;
  ${(props: Props) => props.menuOpen && 'display: none;'}
`;

const SellerName = styled.h1`
  font-weight: 600;
  font-size: 32px;
  max-width: 1200px;
  margin: 12px auto;
  margin-top: 24px;
  width: 100%;
  @media (min-width: 900px) {
    width: 100%;
    margin-top: 32px;
  }
`;

const ContentContainer = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column-reverse;
  margin: 0 auto;
  max-width: 1200px;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 464px;
    display: grid;
    grid-column-gap: 69px;
  }
  @media (max-width: 599px) {
    font-size: 14px;
    margin: 32px 0px;
    margin-top: 0;
    padding-bottom: 25px;
  }
`;
