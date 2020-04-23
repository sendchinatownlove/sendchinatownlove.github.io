import * as React from 'react';
import { useEffect, useState } from 'react';
import HeroBanner from '../HeroBanner';
import Footer from '../Footer';
import { sampleMerchant } from './sample-merchant';
import { StoreInfo } from '../StoreInfo';
import OwnerPanel from '../OwnerPanel';
import { ModalPaymentProvider } from '../../utilities/hooks/ModalPaymentContext/context';
import styles from './styles.module.scss';
import { getSeller } from '../../utilities';
import { useParams } from 'react-router-dom';

const SellerPage: React.FC<{}> = () => {
  // fix typing
  const [seller, setSeller] = useState<any | null>();
  const { id } = useParams();

  const fetchData = async () => {
    const result = id && (await getSeller(id));
    setSeller(result.data);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // TODO(ArtyEmsee): handle actual null states and loading
  return seller ? (
    <div className={styles.container}>
      <main>
        <HeroBanner name={seller.name} />
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
              ownerName={seller.owner_name}
              imageSrc={seller.owner_image_url}
              sellerName={seller.name}
              progressBarColor={seller.progress_bar_color}
              extraInfo={{
              Type: seller.business_type,
              Employees: seller.num_employees,
              Founded: seller.founded_year,
              Website: seller.website_url,
              Menu: seller.menu_url
            }}
              // TODO(jtmckibb): Should not crash here
              sellerId={id!}
            />
          </ModalPaymentProvider>
        </div>
      </main>
      <Footer />
    </div>
  ) : null;
};

export default SellerPage;
