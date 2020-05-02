import * as React from 'react';
import { Link } from 'react-router-dom';
import { BrowsePageSeller } from '../../utilities/api';
import ProgressBar from '../ProgressBar';
import styled from 'styled-components';
import styles from './styles.module.scss';
import temp from './images/temp.png';

const Location = styled.div`
    font-weight: bolder;
    color: #46accc;
  `;

const Summary = styled.p`
    display: -webkit-box;
    height: 45px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

export interface Props {
  storeInfo?: BrowsePageSeller;
}

const MerchantCard = ({ storeInfo }: Props) => {
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
        {
          console.log('store info', storeInfo)
        }
        <div className={styles.merchantCard}>
          <img className={styles.merchantCardLogo} src={storeInfo!.hero_image_url} alt="Logo" />
          <Location> 
            {city}, {state} 
          </Location>
          <h3> 
            {storeInfo!.name} 
          </h3>
          <Summary>
            {storeInfo!.summary}
          </Summary>
          <div style={{ color: '#949494' }}>
            {/* TODO: need to update "donation" phrase and the time stamp */}
            Last donation 1h ago
          </div>{' '}
          <br />
          <ProgressBar
            amountRaised={storeInfo!.amount_raised}
            targetAmount={storeInfo!.target_amount}
            progressBarColor={storeInfo!.progress_bar_color}
          />
        </div>
      </Link>
    </React.Fragment>
  );
};

export default MerchantCard;
