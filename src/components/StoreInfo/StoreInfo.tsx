import * as React from 'react';
import styles from './styles.module.scss';
import StoreDetails from '../StoreDetails';
import classnames from 'classnames';
import { Location, Seller } from '../../utilities';
import defaultStoreFront from './misc-store.png';

type Props = {
  seller: Seller;
};

export const StoreInfo: React.SFC<Props> = ({ seller }) => {
  const { summary, story, cuisineName, locations } = seller;
  return (
    <section className={classnames(styles.container)}>
      {
        <img
          src={
            seller.hero_image_url
              ? process.env.REACT_APP_BASE_URL + seller.hero_image_url
              : defaultStoreFront
          }
          alt={`${seller.name} Illustration`}
          className={styles.merchantIllustration}
        />
      }

      <div className={styles.nationality}>{cuisineName}</div>
      <p>
        {locations &&
          locations.map((location: Location) => (
            <>
              <div className={styles.address}>{location.address1}</div>
              <div className={styles.address}>{location.address2}</div>
              <div className={styles.address}>
                {location.city}, {location.state} {location.zip_code}
              </div>
              <div className={styles.address}>{location.phone_number}</div>
            </>
          ))}
      </p>
      <p>{summary}</p>
      <StoreDetails story={story} />
    </section>
  );
};
