import * as React from 'react';
import HeroBanner from '../HeroBanner';
import { sampleMerchant } from './sample-merchant';
import StoreInfo from '../StoreInfo';
import OwnerPanel from '../OwnerPanel';
import styles from './styles.module.scss';

const MerchantPage: React.SFC = () => {
  return (
    <main className={styles.container}>
      <HeroBanner />
      <div className={styles.contentContainer}>
        <StoreInfo className={styles.storeInfo} {...sampleMerchant.storeInfo} />
        <OwnerPanel className={styles.ownerPanel} {...sampleMerchant.ownerInfo}/>
      </div>
    </main>
  );
};

export default MerchantPage;
