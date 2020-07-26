import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getMerchantGiftCards } from '../../utilities/api/interactionManager';
import Loader from '../../components/Loader/Loader';
import styles from './styles.module.scss'
import { sellers } from '../../utilities/api/endpoints'
import Pagination from 'react-bootstrap/Pagination'
const FilterableTable = require('react-filterable-table');

const MerchantGiftCards = () => {
  const params = useHistory();
  let urlParams = params.location.pathname.match(/\/[^/]+/g) as string[];
  urlParams = urlParams.map((param) => param.replace('/', ''));

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [giftCards, setGiftCards] = useState<any | null>();

  const fields = [
    { name: 'seller_gift_card_id', displayName: 'Voucher ID', inputFilterable: true, sortable: true },
    { name: 'value', displayName: 'Amount', inputFilterable: true, sortable: true },
    { name: 'email', displayName: 'Email', inputFilterable: true, sortable: true },
    { name: 'created_at', displayName: 'Date Created', inputFilterable: true, sortable: true },
    { name: 'expiration', displayName: 'Expiration', inputFilterable: true, sortable: true }
  ]

  const fetchData = async () => {
    try {
      const { data } = await getMerchantGiftCards(urlParams[1], urlParams[2]);

      if (!data) {
        throw new Error('No data returned');
      }

      setGiftCards(data);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
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
        <p>Error!</p>
      ) : (
          <>
            <div className={styles.header}>
                <h1>Voucher Tracker</h1>
                <h2>Melonpanna Tea and Shot</h2>
            </div>
            <div className={styles.metadataHeader}>
                <div className={styles.metadataBlock}>
                    <h1>Last Updated</h1>
                    <h2>2020-07-09</h2>
                </div>
                <div className={styles.metadataBlock}>
                    <h1>Active Vouchers</h1>
                    <h2>2</h2>
                </div>
                <div className={styles.metadataBlock}>
                    <h1>Total Balance</h1>
                    <h2>$100</h2>
                </div>
            </div>
            <FilterableTable
                namespace="Gift Cards"
                initialSort="seller_gift_card_id"
                // data={giftCards}
                dataEndpoint={sellers + urlParams[1] + '/gift_cards/' + urlParams[2]}
                fields={fields}
                noRecordsMessage="There are no people to display"
                noFilteredRecordsMessage="No people match your filters!"
                topPagerVisible={false}
                pageSize={20}
                pageSizes={null}
            />
        </>
      )}
    </>
  );
};

export default MerchantGiftCards;