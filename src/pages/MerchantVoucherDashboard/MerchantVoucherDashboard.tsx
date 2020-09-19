import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getMerchantGiftCards,
  getSeller,
} from '../../utilities/api/interactionManager';
import Loader from '../../components/Loader/Loader';
import styles from './styles.module.scss';
import ErrorPage from '../../components/404Page';
import { Checkbox } from '@material-ui/core';
const FilterableTable = require('react-filterable-table');

const MerchantVoucherDashboard = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [giftCards, setGiftCards] = useState<any | null>();
  const [seller, setSeller] = useState<any | null>();
  const [shouldFilterGAM, setFilterGAM] = useState(false);
  const checkFilterGAM = () => setFilterGAM(!shouldFilterGAM);

  const params = useHistory();
  const urlParams = (params.location.pathname.match(
    /\/[^/]+/g
  ) as string[]).map((param) => param.replace('/', ''));
  const metadata = {
    sellerId: urlParams[0],
    secretId: urlParams[2],
  };

  const fetchData = async () => {
    try {
      let giftCardData = (
        await getMerchantGiftCards(
          metadata.sellerId,
          metadata.secretId,
          shouldFilterGAM
        )
      ).data;
      const sellerData = (await getSeller(metadata.sellerId)).data;

      giftCardData = giftCardData.map((card) => {
        if (card.updated_at === card.created_at) {
          card.updated_at = null;
        }
        return card;
      });

      setGiftCards(giftCardData);
      setSeller(sellerData);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line
  }, [shouldFilterGAM]);

  const renderAmount = (props: FTRenderProps) => {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits: 4,
    }).format(props.value / 100);
  };

  const renderDate = (props: FTRenderProps) => {
    if (!props.value) {
      return 'N/A';
    }
    return new Date(props.value).toISOString().substring(0, 10);
  };

  const fields = [
    {
      name: 'seller_gift_card_id',
      displayName: 'Voucher Code \n 礼品券号码',
      inputFilterable: true,
      sortable: true,
    },
    {
      name: 'email',
      displayName: 'Email \n 电子邮件',
      inputFilterable: true,
      sortable: true,
      thClassName: 'table-email-header',
      tdClassName: 'table-email-container',
    },
    {
      name: 'original_value',
      displayName: 'Original Amount \n 购买金额',
      inputFilterable: true,
      sortable: true,
      render: renderAmount,
    },
    {
      name: 'created_at',
      displayName: 'Date Purchased \n 购买日期',
      inputFilterable: true,
      sortable: true,
      render: renderDate,
    },
    {
      name: 'updated_at',
      displayName: 'Date Last Used \n 上次使用日期',
      inputFilterable: true,
      sortable: true,
      render: renderDate,
    },
    {
      name: 'latest_value',
      displayName: 'Ending Balance  \n 结余',
      inputFilterable: true,
      sortable: true,
      render: renderAmount,
    },
    /* {
      name: 'expiration',
      displayName: 'Expiration',
      inputFilterable: true,
      sortable: true,
    },
    Uncomment if we want expiration */
  ];

  return (
    <>
      {loading ? (
        <Loader isPage={true} />
      ) : error ? (
        <ErrorPage menuOpen={false} />
      ) : (
        <>
          <div className={styles.header}>
            <h1>
              Voucher Tracker <span className={styles.noBreak}>礼品券记录</span>
            </h1>
            <h2>{seller.name}</h2>
          </div>
          <div className={styles.metadataHeader}>
            <div className={styles.metadataBlock}>
              <h1>
                Last Updated{' '}
                <span className={styles.noBreak}>上次更新时间</span>
              </h1>
              <h2>{renderDate({ value: new Date() })}</h2>
            </div>
            <div className={styles.metadataBlock}>
              <h1>
                Active Vouchers{' '}
                <span className={styles.noBreak}>可使用的礼品券数量</span>
              </h1>
              <h2>
                {giftCards &&
                  giftCards.filter((card) => card.latest_value > 0).length}
              </h2>
            </div>
            <div className={styles.metadataBlock}>
              <h1>
                Total Balance <span className={styles.noBreak}>总结余</span>
              </h1>
              <h2>
                {renderAmount({
                  value: giftCards.reduce(
                    (acc, cur) => acc + cur.latest_value,
                    0
                  ),
                })}
              </h2>
            </div>
          </div>
          <div>
            <div className={styles.gamToggle}>
              <Checkbox
                value="shouldFilterGAM"
                inputProps={{ 'aria-label': 'FilterGAM Checkbox' }}
                onClick={checkFilterGAM}
                checked={shouldFilterGAM}
              />
              <span>hide gift-a-meal vouchers 隐藏爱心餐餐券</span>
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
              pageSizes={null} // don't show the page size chooser
              recordCountName="Voucher Found"
              recordCountNamePlural="Vouchers Found"
            />
          </div>
        </>
      )}
    </>
  );
};

export default MerchantVoucherDashboard;

/**
 * Filterable Table Props
 *
 * From the react-filterable-table documentation
 */
interface FTRenderProps {
  /**
   * value of the field in the data. In this case, it's the person's age
   */
  value: any;
  /**
   * the data record for the whole row, in this case it'd be: { name: "Steve", age: 27, job: "Sandwich Eater" }
   */
  record?: any;
  /**
   * the same field object that this render function was passed into.
   * We'll have access to any props on it, including that 'someRandomProp' one we put on there.
   * Those can be functions, too, so we can add custom onClick handlers to our return value
   */
  field?: any;
}
