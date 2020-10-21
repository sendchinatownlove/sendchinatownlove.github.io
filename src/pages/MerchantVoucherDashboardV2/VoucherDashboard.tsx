import classNames from 'classnames';
import moment from 'moment';
import React, { useMemo, useState } from 'react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import EditIcon from '@material-ui/icons/Edit';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';

import type { FTRenderProps } from './types';
import type { GiftCardDetails } from '../../utilities/api/types';

import styles from './styles.module.scss';

const FilterableTable = require('react-filterable-table');

interface Props {
  fetchData: () => void;
  giftCards: GiftCardDetails[];
  organizationName: string;
}

const formatCentsAmount = (cents: number) => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 4,
  }).format(cents / 100);
};

const renderDate = (date: string) => moment(date).format('YYYY-MM-DD');

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

const EditCell = ({body}: {body: JSX.IntrinsicElements | string}) => (
  <div className={styles.editCell}>
    {body}
    <EditIcon classes={{root: styles.editIcon}} />
  </div>
);

const VoucherTable = ({ giftCards }: { giftCards: GiftCardDetails[] }) => {
  const fields = [
    {
      name: 'seller_gift_card_id',
      displayName: 'Voucher Code\n礼品券号码',
      sortable: true,
    },
    {
      name: 'email',
      displayName: 'Email\n电子邮件',
      sortable: true,
      thClassName: 'table-email-header',
      tdClassName: 'table-email-container',
    },
    {
      name: 'original_value',
      displayName: 'Original Amount\n购买金额',
      sortable: true,
      render: (props: FTRenderProps) => formatCentsAmount(props.value),
    },
    {
      name: 'created_at',
      displayName: 'Date Purchased\n购买日期',
      sortable: true,
      render: (props: FTRenderProps) => renderDate(props.value),
    },
    {
      name: 'updated_at',
      displayName: 'Date Last Used\n上次使用日期',
      sortable: true,
      render: (props: FTRenderProps) => {
        let body;
        // If the gift card hasn't been updated since creation (aka it's never
        // been used), show "N/A" in the UI to denote that it hasn't been used
        // yet.
        if (props.record.created_at === props.record.updated_at) {
          body = 'N/A';
        } else {
          body = renderDate(props.value);
        }
        return <EditCell body={body} />;
      },
    },
    {
      name: 'latest_value',
      displayName: 'Ending Balance\n结余',
      inputFilterable: true,
      sortable: true,
      render: (props: FTRenderProps) => <EditCell body={formatCentsAmount(props.value)} />,
    },
  ];

  // TODO: Hover and selected background colors.
  return (
    <FilterableTable
      data={giftCards}
      fields={fields}
      headerVisible={false} // Don't show the filter header.
      initialSort="seller_gift_card_id"
      namespace="Vouchers"
      noFilteredRecordsMessage="No vouchers found for filter"
      noRecordsMessage="No vouchers in our system yet!"
      pageSize={20}
      pageSizes={null} // Don't show the page size chooser.
      recordCountName="Voucher Found"
      recordCountNamePlural="Vouchers Found"
      className={styles.tableContainer}
      topPagerVisible={false}
    />
  );
};

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
        subtitle: moment().format('YYYY-MM-DD, h:mm A'),
        title: 'Last Updated 上次更新时间',
      },
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
          <Button
            className={styles.refreshButton}
            onClick={fetchData}
            variant="outlined"
          >
            <RefreshIcon />
            <div className={styles.refreshText}>Refresh 刷新</div>
          </Button>
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
        <VoucherTable giftCards={filteredGiftCards} />
      </div>
    </div>
  );
};

export default VoucherDashboard;
