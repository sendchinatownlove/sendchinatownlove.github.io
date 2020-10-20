import * as React from 'react';
import { useState } from 'react';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { Location, BrowsePageSeller } from '../../utilities';
import StoreStory from '../StoreStory';
import StoreMenu from './StoreMenuTab';
import StoreGallery from './StoreGalleryTab';
import StoreMerch from './StoreMerchTab';
import StoreSocial from './StoreSocialTab';
import styles from './styles.module.scss';
import defaultStoreFront from './misc-store.png';
import StoryStyles from '../StoreStory/styles.module.scss';

type Props = {
  seller: BrowsePageSeller;
};

export const StoreInfo: React.SFC<Props> = ({ seller }) => {
  const { summary, story, cuisine_name, locations } = seller;

  // modal functionality for menu and gallery tabs
  const [viewImage, setViewImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const expandImage = (url: string) => {
    setViewImage(url);
    setShowModal(true);
  };

  // logic for nav bar & tab switching
  const storeNavItems = [
    story && 'story',
    seller.menu_url && 'menu',
    seller.gallery_image_urls.length > 0 && 'gallery',
    'share',
  ];

  const [currentMerchantView, setMerchantView] = useState('story');

  const switchMerchantView = () => {
    switch (currentMerchantView) {
      case 'gallery':
        return <StoreGallery seller={seller} expandImage={expandImage} />;
      case 'menu':
        return <StoreMenu seller={seller} expandImage={expandImage} />;
      case 'merch':
        return <StoreMerch seller={seller} />;
      case 'share':
        return <StoreSocial seller={seller} />;
      default:
        return <StoreStory story={story} />;
    }
  };

  return (
    <section className={classnames(styles.container)} data-testid="store-info">
      {
        <img
          src={
            seller.hero_image_url ? seller.hero_image_url : defaultStoreFront
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
      <ReactMarkdown
        className={StoryStyles.container}
        source={summary}
      ></ReactMarkdown>
      <StoreNavContainer>
        {storeNavItems.map(
          (value) =>
            value && (
              <NavButton
                key={`${value}-nav-link`}
                className={value === currentMerchantView ? 'active' : ''}
                onClick={() => setMerchantView(value)}
              >
                {value}
              </NavButton>
            )
        )}
      </StoreNavContainer>
      {switchMerchantView()}

      <ImageModal style={{ display: showModal ? 'block' : 'none' }}>
        <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
        <img src={viewImage} alt="modal view" />
      </ImageModal>
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

  &:first-child {
    margin-left: 0;
  }

  &.active {
    color: #dd678a;
    font-weight: 900;
  }
`;

const ImageModal = styled.div`
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  img {
    width: 48vw;
    max-height: 90vh;
    object-fit: cover;
  }

  @media (max-width: 650px) {
    img {
      width: 95vw;
    }
  }
`;

const CloseButton = styled.button`
  position: fixed;
  right: 0;
  top: 0;
  height: 47px;
  width: 47px;
  border-radius: 5px;

  cursor: pointer;
  font-weight: bold;
  font-size: 30px;
  border: none;
  outline: none;
  z-index: 2;
`;
