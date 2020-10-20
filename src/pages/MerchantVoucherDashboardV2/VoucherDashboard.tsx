import * as moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import type { FTRenderProps } from './types';
import {
  getMerchantGiftCards,
  getSeller,
} from '../../utilities/api/interactionManager';
import type { BrowsePageSeller, GiftCardDetails } from '../../utilities/api/types';

import styles from './styles.module.scss';

interface Props {
  giftCards: GiftCardDetails[];
  seller: BrowsePageSeller;
}

// set updated_at to null or '' if it's the same as created at

const renderDate = (props: FTRenderProps) => {
  if (!props.value) {
    return 'N/A';
  }
  return moment(props.value).format('YYYY-MM-DD');
};

const StatsSection = ({subtitle, title}: {subtitle: string, title: string}) => (
  <div className={styles.statsSection}>
    <div className={styles.statsTitle}>{title}</div>
    <div className={styles.statsSubtitle}>{subtitle}</div>
  </div>
);

const VoucherDashboard = ({giftCards, seller}: Props) => {
  const stats = [
    {
      subtitle: moment().format('YYYY-MM-DD, h:mm A'),
      title: 'Last Updated 上次更新时间',
    },
  ];
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
        {stats.map(section => <StatsSection key={section.title} {...section} />)}
      </div>
      {/* TODO: Stats bar (last updated, # active vouchers, total balance) */}
      {/* TODO: Table */}
    </div>
  );
};

export default VoucherDashboard;
