import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { BrowsePageSeller } from '../../utilities/api';
import temp from './temp.png';
import ProgressBar from '../ProgressBar';

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
        <div className={styles.merchantCard}>
          {/* TODO: update src with illustration of each merchant */}
          <img className={styles.merchantCardLogo} src={temp} alt="Logo" />
          <div className={styles.location}>
            {city}, {state}
          </div>
          <h3> {storeInfo!.name} </h3>
          <div className={styles.sellerSummary}>
            <p> {storeInfo!.summary} </p>
          </div>
          <div style={{ color: '#949494' }}>
            {/* TODO: need to update "donation" phrase and the time stamp */}
            Last donation 1h ago
          </div>{' '}
          <br />
          <ProgressBar
            amountRaised={storeInfo!.amount_raised}
            targetAmount={storeInfo!.target_amount}
          />
        </div>
      </Link>
    </React.Fragment>
  );
};

export default MerchantCard;
