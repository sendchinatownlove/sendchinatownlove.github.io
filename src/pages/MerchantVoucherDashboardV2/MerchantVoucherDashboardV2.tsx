import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import VoucherDashboard from './VoucherDashboard';
import ErrorPage from '../../components/404Page';
import Loader from '../../components/Loader/Loader';
import {
  getMerchantGiftCards,
  getSeller,
} from '../../utilities/api/interactionManager';
import type {
  BrowsePageSeller,
  GiftCardDetails,
} from '../../utilities/api/types';

const MerchantVoucherDashboardV2 = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [seller, setSeller] = useState<BrowsePageSeller | null>(null);
  const [giftCards, setGiftCards] = useState<GiftCardDetails[]>([]);

  const params = useHistory();
  const urlParams = (params.location.pathname.match(
    /\/[^/]+/g
  ) as string[]).map((param) => param.replace('/', ''));
  const sellerId = urlParams[0];
  const secretId = urlParams[2];

  const fetchData = useCallback(async () => {
    try {
      const sellerResponse = await getSeller(sellerId);
      const giftCardResponse = await getMerchantGiftCards(sellerId, secretId);

      setSeller(sellerResponse.data);
      setGiftCards(giftCardResponse.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [sellerId, secretId]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Loader isPage={true} />;
  } else if (error || !seller) {
    return <ErrorPage menuOpen={false} />;
  }

  return (
    <VoucherDashboard
      fetchData={fetchData}
      giftCards={giftCards}
      organizationName={seller.name}
    />
  );
};

export default MerchantVoucherDashboardV2;
