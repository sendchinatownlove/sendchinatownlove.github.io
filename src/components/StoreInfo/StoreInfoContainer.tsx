import * as React from 'react';
import { useState } from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { Location, BrowsePageSeller } from '../../utilities';
import StoreStory from '../StoreStory';
import StoreMenu from './StoreMenuTab';
import StoreGallery from './StoreGalleryTab';
import StoreMerch from './StoreMerchTab';
import styles from './styles.module.scss';
import defaultStoreFront from './misc-store.png';

type Props = {
  seller: BrowsePageSeller;
};

export const StoreInfo: React.SFC<Props> = ({ seller }) => {
  const { summary, story, cuisine_name, locations } = seller;

  const storeNavItems = ['story', 'menu', 'gallery', 'share'];

  const [currentMerchantView, setMerchantView] = useState('story');

  const switchMerchantView = () => {
    switch (currentMerchantView) {
      case 'gallery':
        return <StoreGallery seller={seller} />;
      case 'menu':
        return <StoreMenu seller={seller} />;
      case 'merch':
        return <StoreMerch seller={seller} />;
      case 'share':
        // TODO: plug in the share page that Dan creates
        return;
      default:
        return <StoreStory story={story} />;
    }
  };

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
      <StoreNavContainer>
        {storeNavItems.map((value) => (
          <NavButton
            key={`${value}-nav-link`}
            className={value === currentMerchantView ? 'active' : ''}
            onClick={() => setMerchantView(value)}
          >
            {value}
          </NavButton>
        ))}
      </StoreNavContainer>
      {switchMerchantView()}
    </section>
  );
};

const StoreNavContainer = styled.div`
  position: relative;
  overflow-y: scroll;
  white-space: nowrap;
  -ms-overflow-style: none;

  padding-bottom: 27px;
  margin-bottom: 40px;
  border-bottom: 1px solid #dedede;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavButton = styled.button`
  display: inline;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 18px;
  letter-spacing: 0.1em;
  margin: 12px 15px 0;
  color: black;
  background-color: white;
  border: none;
  outline: none;
  cursor: pointer;
  width: 100px;

  &:first-child {
    margin-left: 0;
  }

  &.active {
    color: #dd678a;
    font-weight: 900;
  }
`;
