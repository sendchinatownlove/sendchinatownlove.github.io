import * as React from 'react';
import { useEffect, useState } from 'react';
import { getSellers } from '../../utilities';
import NavBar from './MerchantNavBar';
import MerchantCard from './MerchantCard';
import DescriptionBox from './DescriptionBox';
import ContributionBar from './ContributionBar';
import styles from './styles.module.scss';
import nycMapBackground from './images/nyc_3.png';
import { LoaderFillerContainer } from '../Loader';
import DonationPoolBox from './DonationPool';
import { useTranslation } from 'react-i18next';
import ReactPixel from 'react-facebook-pixel';

interface Props {
  menuOpen: boolean;
}

ReactPixel.trackCustom('MerchantsPageView', {});
const MerchantsPage = (props: Props) => {
  const { t } = useTranslation();

  const flyerZip: string =
    process.env.PUBLIC_URL + './assets/send-chinatown-love-flyers.zip';

  const [sellers, setSellers] = useState<any | null>();
  const [filter, setFilter] = useState<any | null>();
  const [totalDonations, setDonations] = useState(0);
  const [totalGiftCards, setGiftCards] = useState(0);

  const fetchData = async () => {
    const { data } = await getSellers();

    const contributions = data.reduce(
      (total: any, store: any) => {
        return [
          total[0] + store.donation_amount,
          total[1] + store.gift_card_amount,
        ];
      },
      [0, 0]
    );

    setSellers(data);
    setFilter(data);
    setDonations(contributions[0]);
    setGiftCards(contributions[1]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // TODO: replace this filter with a backend API call
  const filterStoreType = (type: any) => {
    if (type === 'all') {
      setFilter(sellers);
    } else {
      const result = sellers.filter(
        (store: any) => store.cuisine_name === type
      );
      setFilter(result);
    }
  };

  return (
    <div
      className={styles.container}
      style={{ display: props.menuOpen ? 'none' : 'inherit' }}
    >
      {filter ? (
        <>
          <div className={styles.overlayContainer}>
            <img
              src={nycMapBackground}
              className={styles.nycMap}
              alt="NYC MAP"
            />
            <div className={styles.contentContainer}>
              <div className={styles.textArea}>
                <h2 style={{ fontWeight: 'bolder' }}>
                  {t('merchantsPage.platformInfoHeader')}
                </h2>
                <br />
                <p>{t('merchantsPage.platformInfoDescription')}</p>
                <p>{t('merchantsPage.platformInfoAction')}</p>
              </div>
              {/* TODO: hook this part up to actual amounts - is there a total amount api call? */}
              <div className={styles.storeInfo}>
                <ContributionBar
                  totalDonations={totalDonations}
                  totalGiftCards={totalGiftCards}
                />
              </div>
              <div className={styles.ownerPanel}>
                <DescriptionBox />
              </div>
            </div>
          </div>

          <div className={styles.merchantInfoContainer}>
            <DonationPoolBox />

            <div className={styles.storeInfoContainer}>
              <NavBar filterStoreType={filterStoreType} />

              <div className={styles.merchantsContainer}>
                {filter.map((store: any) =>
                  store.seller_id !== 'send-chinatown-love' ? (
                    <MerchantCard key={store.seller_id} storeInfo={store} />
                  ) : null
                )}
              </div>
            </div>
          </div>

          <div className={styles.flyerContainer}>
            <p>
              {t('merchantsPage.flyerAsk') + ' '}
              <a className={styles.redLink} download href={flyerZip}>
                {t('merchantsPage.flyerDownload')}
              </a>
            </p>
          </div>
        </>
      ) : (
        <LoaderFillerContainer />
      )}
    </div>
  );
};

export default MerchantsPage;
