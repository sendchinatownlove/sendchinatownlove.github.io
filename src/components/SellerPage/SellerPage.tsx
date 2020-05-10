import * as React from 'react';
import { useEffect, useState } from 'react';
import { StoreInfo } from '../StoreInfo';
import OwnerPanel from '../OwnerPanel';
import ErrorPage from '../404Page';
import { ModalPaymentProvider } from '../../utilities/hooks/ModalPaymentContext/context';
import styles from './styles.module.scss';
import { getSeller } from '../../utilities';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import styled from 'styled-components';

interface Props {
  menuOpen: boolean;
}

const SellerPage = (props: Props) => {
  // fix typing
  const [seller, setSeller] = useState<any | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  const fetchData = async () => {
    setLoading(true);
    const result = id && (await getSeller(id));
    setSeller(result.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // TODO(ArtyEmsee): handle actual null states and loading
  return seller ? (
    <div
      className={styles.container}
      style={{ display: props.menuOpen ? 'none' : 'inherit' }}
    >
      <SellerName>{seller.name}</SellerName>
      <div className={styles.contentContainer}>
        {/* TODO(ArtyEmsee): Fix object mapping */}
        <StoreInfo
          seller={{
            name: seller.name,
            locations: seller.locations,
            cuisineName: seller.cuisine_name,
            story: seller.story,
            summary: seller.summary,
            hero_image_url: seller.hero_image_url,
          }}
        />
        <ModalPaymentProvider>
          <OwnerPanel
            className={styles.ownerPanel}
            acceptDonations={seller.accept_donations}
            sellGiftCards={seller.sell_gift_cards}
            amountRaised={seller.amount_raised}
            targetAmount={seller.target_amount}
            numContributions={seller.num_contributions}
            numDonations={seller.num_donations}
            numGiftCards={seller.num_gift_cards}
            donationAmount={seller.donation_amount}
            giftCardAmount={seller.gift_card_amount}
            ownerName={seller.owner_name}
            imageSrc={seller.owner_image_url}
            sellerName={seller.name}
            progressBarColor={seller.progress_bar_color}
            extraInfo={{
              Type: seller.business_type,
              Employees: seller.num_employees,
              Founded: seller.founded_year,
              Website: seller.website_url,
              Menu: seller.menu_url,
            }}
            // TODO(jtmckibb): Should not crash here
            sellerId={id!}
          />
        </ModalPaymentProvider>
      </div>
    </div>
  ) : (
    <>
      {loading ? (
        <Loader isPage={true} />
      ) : (
        <ErrorPage menuOpen={props.menuOpen} />
      )}
    </>
  );
};

export default SellerPage;

const SellerName = styled.div`
  font-weight: 600;
  font-size: 32px;
  max-width: 1200px;
  margin: 12px auto;
  margin-top: 24px;
  width: 100%;
  @include for-tablet-landscape-up {
    width: 90%;
    margin-top: 32px;
  }
`;
