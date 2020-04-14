import * as React from 'react';
import { useEffect, useState } from 'react';
import HeroBanner from '../HeroBanner';
import Footer from '../Footer';
import { sampleMerchant } from './sample-merchant';
import { StoreInfo } from '../StoreInfo';
import OwnerPanel from '../OwnerPanel';
import styles from './styles.module.scss';
import { getSeller, Seller } from '../../utilities';

const SellerPage: React.FC<{}> = () => {
  // fix typing
  const [seller, setSeller] = useState<any | null>();
  // TO DO: implement component async pattern for api dep/loading state
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await getSeller();
    setSeller(result.data);
  };

  console.log('SellerPage.tsx', { seller });

  // TO DO: handle actual null states and loading
  return seller ? (
    <div className={styles.container}>
      <main>
        <HeroBanner name={seller.name} />
        <div className={styles.contentContainer}>
          {/* TO DO: Fix object mapping */}
          <StoreInfo
            seller={{
              name: seller.name,
              phoneNumber: seller.phone_number,
              address: seller.address,
              className: '',
              cuisineName: seller.cuisine_name,
              story: seller.story,
              summary: seller.summary,
            }}
          />
          <OwnerPanel
            className={styles.ownerPanel}
            {...sampleMerchant.ownerInfo}
          />
        </div>
      </main>
      <Footer />
    </div>
  ) : null;
};

export default SellerPage;
