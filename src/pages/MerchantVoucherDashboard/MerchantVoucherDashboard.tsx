import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import VoucherDashboard from './VoucherDashboard';
import ErrorPage from '../../components/404Page';
import Loader from '../../components/Loader/Loader';
import {
  getMerchantGiftCards,
  getSeller,
} from '../../utilities/api/interactionManager';
<<<<<<< HEAD
import { formatCurrency } from '../../utilities/general/textFormatter'
import Loader from '../../components/Loader/Loader';
import styles from './styles.module.scss';
import ErrorPage from '../../components/404Page';
import { Checkbox } from '@material-ui/core';
const FilterableTable = require('react-filterable-table');
=======
import type {
  BrowsePageSeller,
  GiftCardDetails,
} from '../../utilities/api/types';
>>>>>>> f6464a23d785ab6358095b83ef408c8381e61005

const MerchantVoucherDashboard = () => {
  const [error, setError] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const [seller, setSeller] = useState<BrowsePageSeller | null>(null);
  const [giftCards, setGiftCards] = useState<GiftCardDetails[]>([]);

  const printRef = useRef(null);
  const [showPrintView, setShowPrintView] = useState<boolean>(false);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onAfterPrint: () => setShowPrintView(false),
  });
  const print = useCallback(async () => {
    if (handlePrint) {
      setShowPrintView(true);
      handlePrint();
    }
  }, [handlePrint]);

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
    }
  }, [sellerId, secretId]);

<<<<<<< HEAD
  useEffect(() => {
    fetchData();

    // eslint-disable-next-line
  }, [shouldFilterGAM]);

  const renderAmount = (props: FTRenderProps) => {
    return formatCurrency(Number(props.value), 0)
  };

  const renderDate = (props: FTRenderProps) => {
    if (!props.value) {
      return 'N/A';
=======
  const onPageLoad = useCallback(async () => {
    try {
      await fetchData();
    } finally {
      setPageLoading(false);
>>>>>>> f6464a23d785ab6358095b83ef408c8381e61005
    }
  }, [fetchData]);

  useEffect(() => {
    onPageLoad();
  }, [onPageLoad]);

  if (pageLoading) {
    return <Loader isPage={true} />;
  } else if (error || !seller) {
    return <ErrorPage menuOpen={false} />;
  }

  return (
    <div ref={printRef}>
      <VoucherDashboard
        fetchData={fetchData}
        giftCards={giftCards}
        handlePrint={print}
        organizationName={seller.name}
        showPrintView={showPrintView}
      />
    </div>
  );
};

export default MerchantVoucherDashboard;
