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
import { LoaderFillerContainer } from '../Loader';
import { getSellers } from '../../utilities/api';
import type { BrowsePageSeller } from '../../utilities/api/types';
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
  const websiteImages = getWebsiteImages();
  const { t, i18n } = useTranslation();
  const [sellers, setSellers] = useState<any | null>();
  const [filter, setFilter] = useState<any | null>();
  const [contributions, setContributions] = useState<ContributionsType>(
    INITIAL_CONTRIBUTIONS
  );

  const fetchData = async (lang?: string) => {
    const { data } = await getSellers(lang);

    setSellers(data);
    setFilter(data);
    setContributions(
      data.reduce(
        (totalContributions: ContributionsType, store: BrowsePageSeller) => ({
          donationAmount:
            totalContributions.donationAmount + store.donation_amount,
          giftCardAmount:
            totalContributions.giftCardAmount + store.gift_card_amount,
          giftAMealAmount:
            totalContributions.giftAMealAmount + store.gift_a_meal_amount,
        }),
        INITIAL_CONTRIBUTIONS
      )
    );
  };

  useEffect(() => {
    fetchData(i18n.language);
  }, [i18n.language]);

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
        const flushing = sellers.filter(
          (store: any) =>
            store!.locations.length > 0 &&
            store!.locations[0].city === 'Flushing'
        );
        result.push(...flushing);
      }
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
              src={websiteImages.merchantHero}
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
              <div className={styles.storeInfo}>
                <ContributionBar
                  donationsRaised={contributions.donationAmount}
                  giftAMealAmountRaised={contributions.giftAMealAmount}
                  // giftCardAmountRaised includes the amount from the gift-a-meal program.
                  // Subtract out contributions.giftAMealAmount so we don't overcount.
                  giftCardAmountRaised={
                    contributions.giftCardAmount - contributions.giftAMealAmount
                  }
                />
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
              <h2>
                <b>{t('merchantsPage.merchantHeader')}</b>
              </h2>
              <br />
              <br />

              <div className={styles.merchantsContainer}>
                {filter.map((store: any) =>
                  store.seller_id !== 'send-chinatown-love' ? (
                    <MerchantCard key={store.seller_id} storeInfo={store} />
                  ) : null
                )}
              </div>
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
        </>
      ) : (
        <LoaderFillerContainer />
      )}
    </div>
  );
};

export default MerchantsPage;
