import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getMerchantGiftCards,
  getSeller,
} from '../../utilities/api/interactionManager';
import Loader from '../../components/Loader/Loader';
import styles from './styles.module.scss';
import ErrorPage from '../../components/404Page';
const FilterableTable = require('react-filterable-table');

const MerchantGiftCards = () => {
  const params = useHistory();
  let urlParams = params.location.pathname.match(/\/[^/]+/g) as string[];
  urlParams = urlParams.map((param) => param.replace('/', ''));

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [giftCards, setGiftCards] = useState<any | null>();
  const [seller, setSeller] = useState<any | null>();

  const renderAmount = (props) => {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits: 4,
    }).format(props.value / 100);
  };

  const renderDate = (props) => {
    return new Date(props.value).toISOString().substring(0, 10);
  };

  const fields = [
    {
      name: 'seller_gift_card_id',
      displayName: 'Voucher ID',
      inputFilterable: true,
      sortable: true,
    },
    {
      name: 'email',
      displayName: 'Email',
      inputFilterable: true,
      sortable: true,
    },
    {
      name: 'value',
      displayName: 'Amount',
      inputFilterable: true,
      sortable: true,
      render: renderAmount,
    },
    {
      name: 'created_at',
      displayName: 'Date Created',
      inputFilterable: true,
      sortable: true,
      render: renderDate,
    },
    {
      name: 'expiration',
      displayName: 'Expiration',
      inputFilterable: true,
      sortable: true,
    },
  ];

  const fetchData = async () => {
    try {
      const { data } = await getMerchantGiftCards(urlParams[1], urlParams[2]);
      const seller = (await getSeller(urlParams[1])).data;

      setGiftCards(data);
      setSeller(seller);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <Loader isPage={true} />
      ) : error ? (
        <ErrorPage menuOpen={false} />
      ) : (
        <>
          <div className={styles.header}>
            <h1>Voucher Tracker</h1>
            <h2>{seller.name}</h2>
          </div>
          <div className={styles.metadataHeader}>
            <div className={styles.metadataBlock}>
              <h1>Last Updated</h1>
              <h2>{renderDate({ value: new Date() })}</h2>
            </div>
            <div className={styles.metadataBlock}>
              <h1>Active Vouchers</h1>
              <h2>{giftCards && giftCards.length}</h2>
            </div>
            <div className={styles.metadataBlock}>
              <h1>Total Balance</h1>
              <h2>
                {renderAmount({
                  value: giftCards.reduce((acc, cur) => acc + cur.value, 0),
                })}
              </h2>
            </div>
          </div>
          <FilterableTable
            namespace="Vouchers"
            initialSort="seller_gift_card_id"
            data={giftCards}
            fields={fields}
            noRecordsMessage="No vouchers in our system yet!"
            noFilteredRecordsMessage="No vouchers found for filter"
            topPagerVisible={false}
            pageSize={20}
            pageSizes={null}
            recordCountName="Voucher"
            recordCountNamePlural="Vouchers"
          />
        </>
      )}
    </>
  );
};

export default MerchantGiftCards;
