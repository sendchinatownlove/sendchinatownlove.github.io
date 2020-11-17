import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Location } from '../../utilities';

interface Props {
  locations: Location[] | undefined;
}

const StoreLocation: FC<Props> = ({ locations }) => {
  return (
    <>
      {locations && (
        <div className={styles['container-address']}>
          {locations.length > 0
            ? locations.map((location: Location, i) => (
                <div
                  className={styles.wrap__singleLocation}
                  key={location.seller_id}
                >
                  <address>
                    <p className={styles.address}>
                      {location.address1 + (location.address2 || '')}
                    </p>
                    <p className={styles.address}>
                      {location.city}, {location.state} {location.zip_code}
                    </p>
                  </address>
                  <p className={styles.address}>{location.phone_number}</p>
                </div>
              ))
            : 'Address Not Available'}
        </div>
      )}
    </>
  );
};

export default StoreLocation;
