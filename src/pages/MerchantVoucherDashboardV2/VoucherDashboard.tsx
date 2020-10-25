import classNames from 'classnames';
import moment from 'moment';
import React, { useCallback, useMemo, useState } from 'react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';

import VoucherTable from './VoucherTable';
import { formatCentsAmount } from './utils';
import Loader from '../../components/Loader/Loader';
import type { GiftCardDetails } from '../../utilities/api/types';

import styles from './styles.module.scss';

interface Props {
  fetchData: () => Promise<void>;
  giftCards: GiftCardDetails[];
  organizationName: string;
}

const RefreshButton = ({ onClick }: { onClick: () => Promise<void> }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);

    // onClick handler is passed in from merchant dashboard parent
    // component. It handles the error async state.
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  }, [onClick]);

  return (
    <Button
      className={styles.refreshButton}
      onClick={fetchData}
      variant="outlined"
    >
      <div className={styles.refreshButtonIcon}>
        {loading ? <Loader size="24px" /> : <RefreshIcon />}
      </div>
      <div className={styles.refreshText}>Refresh 刷新</div>
    </Button>
  );
};

const StatsSection = ({
  subtitle,
  title,
}: {
  subtitle: string;
  title: string;
}) => (
  <div>
    <div className={styles.statsTitle}>{title}</div>
    <div className={styles.statsSubtitle}>{subtitle}</div>
  </div>
);

const VoucherDashboard = ({
  fetchData,
  giftCards,
  organizationName,
}: Props) => {
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [filterGam, setFilterGam] = useState<boolean>(false);

  const stats = useMemo(
    () => [
      {
        subtitle: String(
          giftCards.filter((card) => card.latest_value > 0).length
        ),
        title: '# Active Vouchers  可使用的礼品券数量',
      },
      {
        subtitle: formatCentsAmount(
          giftCards.reduce((total, curr) => total + curr.latest_value, 0)
        ),
        title: 'Total Balance  总结余',
      },
      {
        subtitle: moment().format('YYYY-MM-DD, h:mm A'),
        title: 'Last Updated 上次更新时间',
      },
    ],
    [giftCards]
  );

  const filteredGiftCards = useMemo(() => {
    if (!searchFilter && !filterGam) {
      return giftCards;
    }

    return giftCards.filter((giftCard: GiftCardDetails) => {
      // If we're filtering by GAM and the gift card is single use (right now,
      // only GAM has single use gift cards), filter this gift card out.
      if (filterGam && giftCard.single_use) {
        return false;
      }

      // If there is text in the search box, filter gift cards by filterable
      // fields.
      if (searchFilter) {
        const filterableFields = ['email', 'seller_gift_card_id'];
        const lowercaseSearch = searchFilter.toLowerCase();

        for (let i = 0; i < filterableFields.length; i++) {
          if (
            giftCard[filterableFields[i]]
              .toLowerCase()
              .indexOf(lowercaseSearch) !== -1
          ) {
            return true;
          }
        }
        return false;
      }

      return true;
    });
  }, [filterGam, giftCards, searchFilter]);

  return (
    <div>
      <div className={styles.header}>
        <div>
          <div className={styles.headerTitle}>Voucher Tracker 礼品券记录</div>
          <div className={styles.headerSubtitle}>{organizationName}</div>
        </div>
        <div className={styles.actionButtons}>
          <RefreshButton onClick={fetchData} />
          {/* TODO: Print button */}
        </div>
      </div>
      <div className={styles.stats}>
        {stats.map((section) => (
          <StatsSection key={section.title} {...section} />
        ))}
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.filterSection}>
          <div className={styles.searchBar}>
            <div className={styles.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              className={styles.searchText}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearchFilter(event.target.value)
              }
              placeholder="Search by Voucher Code or Email Address 使用礼品券号码或电子邮件搜寻"
            />
          </div>
          <div className={styles.filterGamContainer}>
            <Checkbox
              checked={filterGam}
              className={styles.checkbox}
              classes={{
                colorSecondary: filterGam ? styles.filterGamSelected : '',
              }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFilterGam(event.target.checked)
              }
            />
            <div
              className={classNames({
                [styles.filterGamText]: true,
                [styles.filterGamSelected]: filterGam,
              })}
            >
              Hide gift-a-meal vouchers
              <br />
              隐藏爱心餐餐券
            </div>
          </div>
        </div>
        <VoucherTable fetchData={fetchData} giftCards={filteredGiftCards} />
      </div>
    </div>
  );
};

export default VoucherDashboard;
