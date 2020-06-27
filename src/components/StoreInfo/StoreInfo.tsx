import * as React from 'react';
import styles from './styles.module.scss';
import StoreDetails from '../StoreDetails';
import classnames from 'classnames';
import { Location, BrowsePageSeller } from '../../utilities';
import defaultStoreFront from './misc-store.png';

type Props = {
  seller: BrowsePageSeller;
};

export const StoreInfo: React.SFC<Props> = ({ seller }) => {
  const { summary, story, cuisine_name, locations } = seller;
  // temp
  console.log(seller)
  // temp
  return (
    <section className={classnames(styles.container)} data-testid="Store Info">
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

      <div className={styles.nationality}>{cuisine_name}</div>
      <div>
        {locations &&
          locations.map((location: Location) => (
            <React.Fragment key={location.seller_id}>
              <div className={styles.address}>{location.address1}</div>
              <div className={styles.address}>{location.address2}</div>
              <div className={styles.address}>
                {location.city}, {location.state} {location.zip_code}
              </div>
              <div className={styles.address}>{location.phone_number}</div>
            </React.Fragment>
          ))}
      </div>
      <p>{summary}</p>
      <StoreDetails story={story} />
    </section>
  );
};
