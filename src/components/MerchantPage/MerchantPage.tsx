import * as React from 'react';
import HeroBanner from '../HeroBanner';
import { sampleMerchant } from './sample-merchant';
import StoreInfo from '../StoreInfo';
import OwnerPanel from '../OwnerPanel';
import styles from './styles.module.scss';

const MerchantPage: React.SFC = () => {
  const storeInfoProps = {
    ...sampleMerchant.storeInfo,
    storeDetailsProps: {
      storeStoryProps: {
        story: sampleMerchant.storeStory,
      },
    },
    className: styles.storeInfo,
  };
  return (
    <main className={styles.container}>
      <HeroBanner />
      <div className={styles.contentContainer}>
        <StoreInfo {...storeInfoProps} />
        <OwnerPanel
          className={styles.ownerPanel}
          {...sampleMerchant.ownerInfo}
        />
      </div>
    </main>
  );
};

export default MerchantPage;
