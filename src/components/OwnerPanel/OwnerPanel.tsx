import React, { useState } from 'react';
import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import { SET_MODAL_VIEW } from '../../utilities/hooks/ModalPaymentContext/constants';
import { BrowsePageSeller } from '../../utilities/api/types';
import Modal from '../Modal';
import ProgressBar from '../ProgressBar';
import defaultOwnerImage from './assets/female.svg';
import styled from 'styled-components';
import styles from './styles.module.scss';
import classnames from 'classnames';
import chevron from './assets/chevron.svg';
import DonationButtons from '../DonationButtons';
import OrderNow from './OrderNow';
import { useMedia } from 'use-media';

import { dummy } from './dummy'

interface Props {
  seller: BrowsePageSeller;
}

interface State {
  show: boolean;
  purchaseType: string;
}

const ModalBox: any = Modal;

const OwnerPanel = ({ seller }: Props) => {
  const showAltLayout = useMedia({minWidth: 900})

  const dispatch = useModalPaymentDispatch();
  const [purchaseType, setPurchaseType] = useState('');
  const [showOrderNow, toggleOrderNow] = useState(true);
  const [showDonationsFooter, toggleDonationsFooter] = useState(false)

  const showModal = (event: any) => {
    dispatch({ type: SET_MODAL_VIEW, payload: 0 });
    setPurchaseType(event.target.value);
  };

  const costPerMealDollars = seller.cost_per_meal / 100;

  return (
    <>
      {
        showAltLayout
          ? <Panel>

              <div className={styles.subsection}>
                {dummy.isOpen && (
                  <div className={styles.nowOpenFlag}>
                    Now Open
                  </div>
                )}

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
                <DonationButtons seller={seller} showModal={showModal} />
              </div>

              {dummy.isOpen && (
                <React.Fragment>
                  { showOrderNow && <OrderNow dummy={dummy} /> }
                  <button 
                    className={classnames(styles.button, styles.orderNow__button)}
                    onClick={() => toggleOrderNow(!showOrderNow)}
                  >
                    {
                      showOrderNow 
                        ? 'Hide'
                        : 'Order Now'
                    }
                    <img src={chevron} alt="chevron" className={showOrderNow ? styles.flipped : styles.unflipped} />
                  </button>
                </React.Fragment>
              )}
              
            </Panel>
          : <Footer>
              {showDonationsFooter ? <DonationButtons seller={seller} showModal={showModal} /> : null}
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
                  className={classnames(styles.button, 'button--filled', styles.support__button)}
                  onClick={() => toggleDonationsFooter(!showDonationsFooter)}
                >
                  {showDonationsFooter ? 'Close' : 'Support'}
                </button>
              </div>
          </Footer>
      }

      <ModalBox
        purchaseType={purchaseType}
        sellerId={seller.seller_id}
        sellerName={seller.name}
        costPerMeal={costPerMealDollars}
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
`;
