import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getMerchantGiftCards } from '../../utilities/api/interactionManager';
import Loader from '../../components/Loader/Loader';
import styles from './styles.module.scss';
import { sellers } from '../../utilities/api/endpoints';
const FilterableTable = require('react-filterable-table');

const MerchantGiftCards = () => {
  const params = useHistory();
  let urlParams = params.location.pathname.match(/\/[^/]+/g) as string[];
  urlParams = urlParams.map((param) => param.replace('/', ''));

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [giftCards, setGiftCards] = useState<any | null>();

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
              <h2>{new Date().toISOString().substring(0, 10)}</h2>
            </div>
            <div className={styles.metadataBlock}>
              <h1>Active Vouchers</h1>
              <h2>{giftCards && giftCards.length}</h2>
            </div>
            <div className={styles.metadataBlock}>
              <h1>Total Balance</h1>
              <h2>
                {giftCards &&
                  renderAmount({
                    value: giftCards.reduce(
                      (acc, cur) => acc.value + cur.value
                    ),
                  })}
              </h2>
            </div>
          </div>
          <FilterableTable
            namespace="Gift Cards"
            initialSort="seller_gift_card_id"
            // data={giftCards}
            dataEndpoint={
              sellers + urlParams[1] + '/gift_cards/' + urlParams[2]
            }
            fields={fields}
            noRecordsMessage="There are no vouchers to display"
            noFilteredRecordsMessage="No vouchers match your filters!"
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
