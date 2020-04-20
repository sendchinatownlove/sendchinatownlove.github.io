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
            }}
          />
          <OwnerPanel
            className={styles.ownerPanel}
            acceptDonations={seller.accept_donations}
            sellGiftCards={seller.sell_gift_cards}
            amountRaised={seller.amount_raised}
            targetAmount={seller.target_amount}
            ownerName={seller.owner_name}
            imageSrc={sampleMerchant.ownerInfo.imageSrc}
            sellerName={seller.name}
            progressBarColor={seller.progress_bar_color}
            extraInfo={seller.seller_extra_info}
            // TODO(jtmckibb): Should not crash here
            sellerId={id!}
          />
        </div>
      </main>
      <Footer />
    </div>
  ) : null;
};

export default SellerPage;
