import * as React from 'react';
import { Link } from 'react-router-dom';
import { BrowsePageSeller } from '../../utilities/api';
import ProgressBar from '../../components/ProgressBar';
import styled from 'styled-components';
import { smallScreens } from '../../utilities/general/responsive';

export interface Props {
  storeInfo?: BrowsePageSeller;
}

const MerchantCardBox = ({ storeInfo }: Props) => {
  let city = '';
  let state = '';

  if (storeInfo!.locations && storeInfo!.locations[0]) {
    city = storeInfo!.locations[0].city;
    state = storeInfo!.locations[0].state;
  }

  return (
    <React.Fragment>
      <Link
        to={`/${storeInfo!.seller_id}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <MerchantCard>
          <Logo src={storeInfo!.hero_image_url} alt="Logo" />
          <Location>
            {city}, {state}
          </Location>
          <StoreName>{storeInfo!.name}</StoreName>
          <Summary>{storeInfo!.summary || storeInfo!.story}</Summary>
          {/* TODO: need to update "donation" phrase and the time stamp */}
          {/* <div style={{ color: '#949494' }}>
            Last donation 1h ago
          </div> */}
          <br />
          <ProgressBar
            amountRaised={storeInfo!.amount_raised}
            targetAmount={storeInfo!.target_amount}
            progressBarColor={storeInfo!.progress_bar_color}
            numContributions={storeInfo!.num_contributions}
            numDonations={storeInfo!.num_donations}
            numGiftCards={storeInfo!.num_gift_cards}
            donationAmount={storeInfo!.donation_amount}
            giftCardAmount={storeInfo!.gift_card_amount}
          />
        </MerchantCard>
      </Link>
    </React.Fragment>
  );
};

export default MerchantCardBox;

const Location = styled.h4`
  font-weight: bolder;
  color: #1e7c9a;
  font-size: 15px;
`;

const Summary = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 61px;
`;

export const MerchantCard = styled.div`
  height: 475px;
  width: 350px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  padding: 25px;
  font-size: 14px;
  background-color: white;
  &.descriptionBox {
    width: 430px;
    height: 475px;
    text-align: center;
    margin: 0 auto;
    }
  @media (${smallScreens}) {
    margin: 30px;
    width: 85vw;
    &.descriptionBox {
      width: 85vw;
       height: auto;
  } 
`;

const StoreName = styled.h3`
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  color: #1e1e1e;
`;

const Logo = styled.img`
  position: relative;
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 15px;
`;
