import moment from 'moment';
import React, { useMemo } from 'react';

import type { FTRenderProps } from './types';
import type {
  BrowsePageSeller,
  GiftCardDetails,
} from '../../utilities/api/types';

import styles from './styles.module.scss';

const FilterableTable = require('react-filterable-table');

interface Props {
  giftCards: GiftCardDetails[];
  seller: BrowsePageSeller;
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

const GiftCardTable = ({ giftCards }: { giftCards: GiftCardDetails[] }) => {
  // TODO: Edit functionality.
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
        // If the gift card hasn't been updated since creation (aka it's never
        // been used), show "N/A" in the UI to denote that it hasn't been used
        // yet.
        if (props.record.created_at === props.record.updated_at) {
          return 'N/A';
        }
        return renderDate(props.value);
      },
    },
    {
      name: 'latest_value',
      displayName: 'Ending Balance\n结余',
      inputFilterable: true,
      sortable: true,
      render: (props: FTRenderProps) => formatCentsAmount(props.value),
    },
  ];

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
      topPagerVisible={false}
    />
  );
};

const VoucherDashboard = ({ giftCards, seller }: Props) => {
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

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <div className={styles.headerTitle}>Voucher Tracker 礼品券记录</div>
          <div className={styles.headerSubtitle}>{seller.name}</div>
        </div>
        {/* TODO: Refresh and print buttons */}
      </div>
      <div className={styles.stats}>
        {stats.map((section) => (
          <StatsSection key={section.title} {...section} />
        ))}
      </div>
      <div className={styles.tableContainer}>
        {/* TODO: Custom search bar and hide GAM checkbox. */}
        <GiftCardTable giftCards={giftCards} />
      </div>
    </div>
  );
};

export default VoucherDashboard;
