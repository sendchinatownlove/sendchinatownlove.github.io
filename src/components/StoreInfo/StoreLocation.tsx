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
                  <address
                    itemProp="address"
                    itemType="https://schema.org/PostalAddress"
                  >
                    <p itemProp="streetAddress" className={styles.address}>
                      {location.address1}
                      {location.address2 ? <br /> : ''}
                      {location.address2 ? location.address2 : ''}
                    </p>
                    <p className={styles.address}>
                      <span itemProp="addressLocality">{location.city}</span>,{' '}
                      <span itemProp="addressRegion">{location.state}</span>{' '}
                      <span itemProp="postalCode">{location.zip_code}</span>
                    </p>
                  </address>
                  {location.address1 && (
                    <span>
                      <a
                        href={
                          'https://www.google.com/maps/place/' +
                          (
                            (location.address1 + ' ' || '') +
                            (location.city + ' ' || '') +
                            (location.state + ' ' || '') +
                            (location.zip_code || '')
                          ).replaceAll(' ', '+')
                        }
                        target="_blank"
                        className={styles.mapURL}
                      >
                        <i className="fa fa-map-marker"></i> Map
                      </a>
                    </span>
                  )}
                  {location.phone_number && (
                    <p itemProp="telephone" className={styles.phone}>
                      {/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
                        location.phone_number
                      ) ? (
                        <a
                          href={'tel:' + location.phone_number}
                          className={styles.phoneURL}
                        >
                          {location.phone_number}
                        </a>
                      ) : (
                        location.phone_number
                      )}
                    </p>
                  )}
                </div>
              ))
            : 'Address Not Available'}
        </div>
      )}
    </>
  );
};

export default StoreLocation;
