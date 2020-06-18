import React, { useState } from 'react';
import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import { SET_MODAL_VIEW } from '../../utilities/hooks/ModalPaymentContext/constants';
import { BrowsePageSeller } from '../../utilities/api/types';
import Modal from '../Modal';
import ProgressBar from '../ProgressBar';
import defaultOwnerImage from './assets/female.svg';
import styled from 'styled-components';
import styles from './styles.module.scss';
// import classnames from 'classnames';

import DonationSection from './DonationSection'


//
// temp
const dummy = {
  isOpen: true, // create utility function to determine if currently open
  openHours: [ // create utility function to store hours in tuples
    ['Mon - Weds', 'Closed'],
    ['Thurs', '10:00AM - 3:00PM'],
    ['Fri - Sun', '11:00AM - 11:00PM']
  ],
  callOption: { // create utility function to determine if phone available, else set null
    phone_number: '555-555-5555',
    name: 'Call',
    icon_url: 'https://drive.google.com/file/d/1kOIfbXLD9njmICYmKteQF1_A20nML_3t/view?usp=sharing'
  },
  deliveryOptions: [ //
    {
      url: 'www.grubhub.com',
      name: 'GrubHub',
      icon_url: 'https://drive.google.com/file/d/1WRnn6DzXMn2V51QEuZLIhZz459whNd0x/view?usp=sharing'
    },
    {
      url: 'www.seamless.com',
      name: 'Seamless',
      icon_url: 'https://drive.google.com/file/d/1nu0QV1HtplEgByjtCCt7UftCgBU-DMx2/view?usp=sharing'
    }
  ]
}
// temp
//

interface Props {
  seller: BrowsePageSeller;
}

interface State {
  show: boolean;
  purchaseType: string;
}

const ModalBox: any = Modal;

const OwnerPanel = ({ seller }: Props) => {

  const dispatch = useModalPaymentDispatch();
  const [purchaseType, setPurchaseType] = useState('');

  const showModal = (event: any) => {
    dispatch({ type: SET_MODAL_VIEW, payload: 0 });
    setPurchaseType(event.target.value);
  };

  const costPerMealDollars = seller.cost_per_meal / 100;

  return (
    <Container>

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
                ? process.env.REACT_APP_BASE_URL + seller?.owner_image_url
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
        <DonationSection seller={seller} showModal={showModal} />
      </div>

      {dummy.isOpen && (
        <div className={styles.subsection}>
          hi!
        </div>
      )}


      <ModalBox
        purchaseType={purchaseType}
        sellerId={seller.seller_id}
        sellerName={seller.name}
        costPerMeal={costPerMealDollars}
      />
      
    </Container>
  );
};

export default OwnerPanel;

const Container = styled.section`
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
