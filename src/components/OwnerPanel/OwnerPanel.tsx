import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import {
  useModalPaymentDispatch,
  ModalPaymentConstants,
} from '../../utilities/hooks/ModalPaymentContext';
import { BrowsePageSeller } from '../../utilities/api/types';
import { getCampaignsForMerchant } from '../../utilities';
import Modal from '../Modal';
import ProgressBar from '../ProgressBar';
import defaultOwnerImage from './assets/female.svg';
import styled from 'styled-components';
import styles from './styles.module.scss';
import chevron from './assets/chevron.svg';
import DonationButtons from '../DonationButtons';
import OrderNow from './OrderNow';

interface Props {
  seller: BrowsePageSeller;
  sellerHours: any[];
  isMerchantOpen: boolean;
  deliveryService: any[];
  showAltLayout?: boolean;
}

const ModalBox: any = Modal;

const OwnerPanel = ({
  seller,
  sellerHours,
  isMerchantOpen,
  deliveryService,
  showAltLayout
}: Props) => {

  const dispatch = useModalPaymentDispatch(null);
  const [purchaseType, setPurchaseType] = useState('');
  const [activeCampaign, setActiveCampaign] = useState<any | null>();
  const [pricePerMeal, setPricePerMeal] = useState(0);
  const [campaignId, setCampaignId] = useState('');
  const [showOrderNow, toggleOrderNow] = useState(true);
  const [showDonationsFooter, toggleDonationsFooter] = useState(false);

  const fetchData = async (seller_id: string) => {
    const campaigns = await getCampaignsForMerchant(seller_id);
    if (campaigns.data) {
      const active = campaigns.data.find((campaign: any) => campaign.active);
      // product does not support >1 active campaign per merchant
      if (active) {
        setActiveCampaign(active);
        setPricePerMeal(active.price_per_meal);
        setCampaignId(active.campaign_id);
      }
    }
  };

  useEffect(() => {
    if (seller.seller_id) {
      fetchData(seller.seller_id);
    }
  }, [seller.seller_id]);

  const showModal = (event: any) => {
    dispatch({ type: ModalPaymentConstants.SET_MODAL_VIEW, payload: 0 });
    setPurchaseType(event.target.value);
  };

  return (
    <>
      {showAltLayout ? (
        <Panel>
          <div className={styles.subsection}>
            <figure className={styles.ownerContainer}>
              <img
                className={styles.ownerImage}
                src={
                  seller?.owner_image_url
                    ? seller?.owner_image_url
                    : defaultOwnerImage
                }
                alt={seller.owner_name}
              />
            </figure>

            <h2 className={styles.ownerName}>{seller.owner_name}</h2>
            {seller.target_amount && (
              <ProgressBar
                amountRaised={seller.amount_raised}
                targetAmount={seller.target_amount}
                progressBarColor={seller.progress_bar_color}
                numContributions={seller.num_contributions}
                numDonations={seller.num_donations}
                numGiftCards={seller.num_gift_cards}
                donationAmount={seller.donation_amount}
                giftCardAmount={seller.gift_card_amount}
              />
            )}
            <DonationButtons
              seller={seller}
              showModal={showModal}
              active={activeCampaign}
            />
          </div>

          {showOrderNow && (
            <OrderNow
              showingAltLayout={false}
              hours={sellerHours}
              isMerchantOpen={isMerchantOpen}
              deliveryService={deliveryService}
            />
          )}
          <button
            className={classnames(
              styles['button__toggle-modal'],
              styles.button
            )}
            onClick={() => toggleOrderNow(!showOrderNow)}
          >
            {showOrderNow
              ? 'Hide'
              : deliveryService.length > 1
              ? 'View Hours & Order'
              : 'View Hours'}
            <img
              src={chevron}
              alt="chevron"
              className={showOrderNow ? styles.flipped : styles.unflipped}
            />
          </button>
        </Panel>
      ) : (
        <Footer>
          {showDonationsFooter ? (
            <DonationButtons
              seller={seller}
              showModal={showModal}
              active={activeCampaign}
            />
          ) : null}
          <div className={styles.support}>
            {seller.target_amount && (
              <ProgressBar
                amountRaised={seller.amount_raised}
                targetAmount={seller.target_amount}
                progressBarColor={seller.progress_bar_color}
                numContributions={seller.num_contributions}
                numDonations={seller.num_donations}
                numGiftCards={seller.num_gift_cards}
                donationAmount={seller.donation_amount}
                giftCardAmount={seller.gift_card_amount}
              />
            )}
            <button
              className={classnames(
                styles.button,
                'button--filled',
                styles.support__button
              )}
              onClick={() => toggleDonationsFooter(!showDonationsFooter)}
            >
              {showDonationsFooter ? 'Close' : 'Support'}
            </button>
          </div>
        </Footer>
      )}

      <ModalBox
        purchaseType={purchaseType}
        sellerId={seller.seller_id}
        sellerName={seller.name}
        costPerMeal={pricePerMeal / 100}
        nonProfitLocationId={seller.non_profit_location_id}
        campaignId={campaignId}
      />
    </>
  );
};

export default OwnerPanel;

const Panel = styled.section`
  position: relative;
  order: 1;
  grid-row: 1;
  width: 100%;
  @media (min-width: 900px) {
    position: sticky;
    top: 20px;
    order: 2;
    grid-column: 2;
  }
`;

const Footer = styled.section`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 25px;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  @media (max-width: 600px) {
    z-index: 6;
  }
`;
