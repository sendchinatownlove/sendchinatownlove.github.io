import * as React from 'react';
import { useEffect, useState } from 'react';
import { getSellers } from '../../utilities';
import NavBar from './MerchantNavBar';
import MerchantCard from './MerchantCard';
import DescriptionBox from './DescriptionBox';
import ContributionBar from './ContributionBar';
import styles from './styles.module.scss';
// import nycMapBackground from './images/nyc_3.png';
import sclFlyerEnglish from './images/scl-flyer-english.png';
import { LoaderFillerContainer } from '../Loader';
import DonationPoolBox from './DonationPool';
import { smallScreens } from '../../utilities/general/responsive';
import styled from 'styled-components';
import { getWebsiteImages } from '../StoreDetails/StoreImages';

interface Props {
  menuOpen: boolean;
}

const MerchantsPage = (props: Props) => {
  const websiteImages = getWebsiteImages();

  const [sellers, setSellers] = useState<any | null>();
  const [filter, setFilter] = useState<any | null>();
  const [totalDonations, setDonations] = useState(0);
  const [totalGiftCards, setGiftCards] = useState(0);

  const fetchData = async () => {
    const { data } = await getSellers();

    const contributions = data.reduce(
      (total: any, store: any) => {
        return [
          total[0] + store!.donation_amount,
          total[1] + store!.gift_card_amount,
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
        (store: any) => store!.cuisine_name === type
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
              src={websiteImages.merchantHero}
              className={styles.nycMap}
              alt="NYC MAP"
            />
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
                  voucher from them.
                </p>
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

          <MerchantInfoContainer>
            <DonationPoolBox />

            <div className={styles.storeInfoContainer}>
              <NavBar filterStoreType={filterStoreType} />

              <div className={styles.merchantsContainer}>
                {filter.map((store: any) =>
                  store!.seller_id !== 'send-chinatown-love' ? (
                    <MerchantCard key={store!.seller_id} storeInfo={store} />
                  ) : null
                )}
              </div>
            </div>
          </MerchantInfoContainer>

          <FlyerContainer>
            <p>
              Know of any business owners that fit our target merchant?{' '}
              <a download href={sclFlyerEnglish}>
                Download our flyer to share with them.
              </a>
            </p>
          </FlyerContainer>
        </>
      ) : (
        <LoaderFillerContainer />
      )}
    </div>
  );
};

export default MerchantsPage;

const MerchantInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1250px;
  margin: 0 auto;

  @media (${smallScreens}) {
    flex-direction: column-reverse;
  }
`;

const FlyerContainer = styled.div`
  margin: 3vw 7vw;
  font-weight: bold;

  a {
    color: #a7182d;
    text-decoration: none;

    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;
