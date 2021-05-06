import * as React from 'react';
import { useEffect, useState } from 'react';
import ReactPixel from 'react-facebook-pixel';
import { useTranslation } from 'react-i18next';

import ContributionBar from './ContributionBar';
import DonationHighlightBox from './DonationHighlightBox';
import GiftMealHighlightBox from './GiftMealHighlightBox';
import MerchantCard from './MerchantCard';
import MerchantDescriptionBanner from './MerchantDescriptionBanner';
import NavBar from './MerchantNavBar';
import Loader from '../Loader';
import LinearLoader from '../Loader/LinearLoader';
import { getSellers, getTotalContributions } from '../../utilities/api';
import MerchantsGridContainer from './MerchantsGridContainer';
import { getWebsiteImages } from '../../utilities/general/StoreImages';

import styles from './styles.module.scss';

interface Props {
  menuOpen: boolean;
}

type ContributionsType = {
  donationAmount: number;
  giftCardAmount: number;
  giftAMealAmount: number;
};

const INITIAL_CONTRIBUTIONS: ContributionsType = {
  donationAmount: 0,
  giftCardAmount: 0,
  giftAMealAmount: 0,
};

ReactPixel.trackCustom('MerchantsPageView', {});
const MerchantsPage = (props: Props) => {
  const [loadingContrib, setLoadingContrib] = useState(false);
  const [loadingSellers, setLoadingSellers] = useState(false);
  const websiteImages = getWebsiteImages();
  const { t, i18n } = useTranslation();
  const [sellers, setSellers] = useState<any[]>([]);
  const [filter, setFilter] = useState<any[]>([]);
  const [contributions, setContributions] = useState<ContributionsType>(
    INITIAL_CONTRIBUTIONS
  );
  const [totalActiveSellers, setTotalActiveSellers] = useState<number | null>();

  const fetchData = async (lang?: string) => {
    setLoadingSellers(true);
    const { data } = await getSellers(lang);
    setSellers(data);
    setFilter(data);
    setTotalActiveSellers(
      data.filter((seller) => seller.accept_donation || seller.sell_gift_cards)
        .length
    );
    setLoadingSellers(false);
  };

  useEffect(() => {
    fetchData(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    const asyncFetch = async () => {
      setLoadingContrib(true);
      const {
        data: { donation_amount, gift_a_meal_amount, gift_card_amount },
      } = await getTotalContributions();

      setContributions({
        donationAmount: donation_amount,
        giftAMealAmount: gift_a_meal_amount,
        giftCardAmount: gift_card_amount,
      });

      setLoadingContrib(false);
    };

    asyncFetch();
  }, []);

  // TODO: replace this filter with a backend API call
  const filterStoreType = (type: any) => {
    if (type === 'all') {
      setFilter(sellers);
    } else {
      const result = sellers.filter(
        (store: any) =>
          store!.locations.length > 0 && store!.locations[0].city === type
      );
      if (type === 'Floral Park') {
        const queens = sellers.filter(
          (store: any) =>
            store!.locations.length > 0 &&
            (store!.locations[0].city === 'Flushing' ||
              store!.locations[0].city === 'Queens' ||
              store!.locations[0].city === 'Elmhurst')
        );
        result.push(...queens);
      }
      setFilter(result);
    }
  };

  return (
    <div
      className={styles.container}
      style={{ display: props.menuOpen ? 'none' : 'inherit' }}
    >
      <div className={styles.overlayContainer}>
        <img
          src={websiteImages.merchantHero}
          className={styles.nycMap}
          width="2407"
          height="780"
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
          <div className={styles.storeInfo}>
            {!loadingContrib ? (
              <ContributionBar
                donationsRaised={contributions.donationAmount}
                giftAMealAmountRaised={contributions.giftAMealAmount}
                // giftCardAmountRaised includes the amount from the gift-a-meal program.
                // Subtract out contributions.giftAMealAmount so we don't overcount.
                giftCardAmountRaised={
                  contributions.giftCardAmount - contributions.giftAMealAmount
                }
              />
            ) : (
              <LinearLoader />
            )}
          </div>
        </div>
      </div>
      <div className={styles.merchantInfoContainer}>
        <div className={styles.highlightsContainer}>
          <DonationHighlightBox />
          <GiftMealHighlightBox />
        </div>

        <div className={styles.storeInfoContainer}>
          <NavBar filterStoreType={filterStoreType} />
          <div className={styles.row}>
            <h2>
              <b>{t('merchantsPage.merchantHeader')}</b>
            </h2>
            {sellers && <h4>{totalActiveSellers} Total Merchants</h4>}
          </div>
          <br />
          <br />

          <MerchantsGridContainer loadingSellers={loadingSellers}>
            {loadingSellers ? (
              <Loader />
            ) : (
              filter.map((store: any) =>
                store.seller_id !== 'send-chinatown-love' ? (
                  <MerchantCard key={store.seller_id} storeInfo={store} />
                ) : null
              )
            )}
          </MerchantsGridContainer>
        </div>
      </div>
      <MerchantDescriptionBanner />
      <div className={styles.flyerContainer}>
        <p>
          {t('merchantsPage.flyerAsk') + ' '}
          <a
            className={styles.redLink}
            href="https://www.sendchinatownlove.com/merchant-flyers.html"
          >
            {t('merchantsPage.flyerDownload')}
          </a>
        </p>
      </div>
      )
    </div>
  );
};

export default MerchantsPage;
