import * as React from 'react';
import { useEffect, useState } from 'react';
import Footer from '../Footer';
import NavBar from './NavBar';
import MerchantCard from './MerchantCard';
import styles from './styles.module.scss';
import { getSellers } from '../../utilities';

// the hook
import { useTranslation } from 'react-i18next';

const MerchantsPage: React.FC<{}> = () => {
  const [sellers, setSellers] = useState<any | null>();

  const fetchData = async () => {
    const result = await getSellers();
    setSellers(result.data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t, i18n } = useTranslation();

  return sellers ? (
    <React.Fragment>
      <div className={styles.container}>
        <h2>{t('Support our local merchants')}</h2>
        <p>
          Send Chinatown Love is intended to support our local businesses facing
          financial loss. Make a difference today by donating or buying a gift
          card.
        </p>

        <NavBar />

        <div className={styles.merchantsContainer}>
          {sellers.map((store: any) => (
            <MerchantCard storeInfo={store} />
          ))}
        </div>
      </div>

      <Footer />
    </React.Fragment>
  ) : null;
};

export default MerchantsPage;
