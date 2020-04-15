import * as React from 'react';
import { useEffect, useState } from 'react';
import HeroBanner from '../HeroBanner';
import Footer from '../Footer';
import { sampleMerchant } from './sample-merchant';
import { StoreInfo } from '../StoreInfo';
import OwnerPanel from '../OwnerPanel';
import styles from './styles.module.scss';
import { getSeller } from '../../utilities';
import { useParams } from 'react-router-dom';

const SellerPage: React.FC<{}> = () => {
  // fix typing
  const [seller, setSeller] = useState<any | null>();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = id && await getSeller(id);
    setSeller(result.data);
  };

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
              addresses: seller.addresses,
              className: '',
              cuisineName: seller.cuisine_name,
              story: seller.story,
              summary: seller.summary,
            }}
          />
          <OwnerPanel
            className={styles.ownerPanel}
            amountRaised={seller.amount_raised}
            targetAmount={seller.target_amount}
            {...sampleMerchant.ownerInfo}
          />
        </div>
      </main>
      <Footer />
    </div>
  ) : null;
};

export default SellerPage;
