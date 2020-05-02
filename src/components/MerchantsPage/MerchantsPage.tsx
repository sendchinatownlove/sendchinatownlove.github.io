import * as React from 'react';
import { useEffect, useState } from 'react';
import { getSellers } from '../../utilities';
import Footer from '../Footer';
import NavBar from './MerchantNavBar';
import MerchantCard from './MerchantCard';
import DescriptionBox from './DescriptionBox';
import ContributionBar from './ContributionBar';
import styles from './styles.module.scss';
import nycMapBackground from './images/nyc_3.png';

const MerchantsPage: React.FC<{}> = () => {
  const [sellers, setSellers] = useState<any | null>();
  const [filter, setFilter] = useState<any | null>();

  const fetchData = async () => {
    const result = await getSellers();
    await setSellers(result.data);
    await setFilter(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // TODO: replace this filter with a backend API call
  const filterStoreType = async (type: any) => {
    if (type === 'all') {
      await setFilter(sellers);
    } else {
      const result = sellers.filter(
        (store: any) => store!.business_type === type
      );
      await setFilter(result);
    }
  };

  return filter ? (
    <div>
      <div className={styles.container}>
        <div className={styles.overlayContainer}>
          <img src={nycMapBackground} alt="NYC MAP" className={styles.nycMap} />
          <div className={styles.contentContainer}>
            <div className={styles.textArea}>
              <h2 style={{ fontWeight: 'bolder' }}>Our Chinatown</h2>
              <br />
              <p>
                We are providing an online platform to low-tech, cash-only,
                Asian-owned small businesses that have been disproportionately
                impacted by COVID-19.
              </p>
              <p>
                Support local merchants by making a donation or purchasing a
                gift card from them.
              </p>
            </div>
            {/* TODO: hook this part up to actual amounts - is there a total amount api call? */}
            <div className={styles.storeInfo}>
              <ContributionBar totalDonations={3000} totalVouchers={1700} />
            </div>
            <div className={styles.ownerPanel}>
              <DescriptionBox />
            </div>
          </div>
        </div>
        <div className={styles.storeInfoContainer}>
          <NavBar filterStoreType={filterStoreType} />

          <div className={styles.merchantsContainer}>
            {filter.map((store: any) => (
              <MerchantCard key={store!.seller_id} storeInfo={store} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : null;
};

export default MerchantsPage;
