import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { SellerTwo } from '../../utilities/api';
import temp from './temp.png';

export interface Props {
  storeInfo?: SellerTwo;
}

const MerchantCard = ({ storeInfo }: Props) => {
  const storeName = storeInfo?.seller_id
    .split('-')
    .map((name) => name[0].toUpperCase() + name.slice(1))
    .join(' ');

  return (
    <React.Fragment>
      <Link
        to={`/${storeInfo?.seller_id}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <div className={styles.merchantCard}>
          <img className={styles.merchantCardLogo} src={temp} alt="Logo" />
          <div className={styles.location}>Chinatown, Manhattan</div>
          <h3> {storeName} </h3>
          <p>
            {' '}
            100% of all gift card purchases and donations will go to support
            this business and their staff.
          </p>
          <div style={{ color: '#949494' }}>
            {/* need to fix this */}
            Last donation 1h ago
          </div>{' '}
          <br />
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.myBar}
                style={{
                  width: `${
                    (storeInfo!.amount_raised / storeInfo!.target_amount) * 100
                  }%`,
                }}
              >
                {' '}
              </div>
            </div>
            <div>
              $ {Math.floor(storeInfo!.amount_raised) / 100} out of $
              {Math.floor(storeInfo!.target_amount) / 100}{' '}
            </div>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
};

export default MerchantCard;
