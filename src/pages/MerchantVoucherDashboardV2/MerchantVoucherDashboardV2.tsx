import React from 'react';

import styles from './styles.module.scss';

const MerchantVoucherDashboardV2 = () => {
  // TODO: API call to get gift card / seller info
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h1>Voucher Tracker 礼品券记录</h1>
          <h2>[shop name]</h2>
        </div>
        {/* TODO: Refresh and print buttons */}
      </div>
      {/* TODO: Stats bar (last updated, # active vouchers, total balance) */}
      {/* TODO: Table */}
    </div>
  );
};

export default MerchantVoucherDashboardV2;
