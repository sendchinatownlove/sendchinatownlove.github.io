import React, { FC } from 'react';
import { useState } from 'react';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { BrowsePageSeller } from '../../utilities/api';
import StoreStory from '../StoreStory';
import StoreMenu from './StoreMenuTab';
import StoreGallery from './StoreGalleryTab';
import StoreMerch from './StoreMerchTab';
import StoreSocial from './StoreSocialTab';
import StoreLocation from './StoreLocation';
import styles from './styles.module.scss';
import defaultStoreFront from './misc-store.png';
import { useMedia } from 'use-media';
import { OrderNow, MobileOrderWrapper } from '../OwnerPanel';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

type Props = {
  seller: BrowsePageSeller;
  sellerHours: any[];
  isMerchantOpen: boolean;
  deliveryService: any[];
};

export const StoreInfo: FC<Props> = ({
  seller,
  sellerHours,
  isMerchantOpen,
  deliveryService,
}) => {
  const showAltLayout = useMedia({ maxWidth: 900 });
  const { summary, story, cuisine_name, locations, website_url } = seller;

  // modal functionality for menu and gallery tabs
  const [viewImage, setViewImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageIndex, setImageIndex] = useState(-1);

  const expandImage = (url: string, index: number) => {
    setViewImage(url);
    setShowModal(true);
    setImageIndex(index ? index : 0);
  };

  const updateImageIndex = (index: number) => {
    if (index < 0 || index >= seller.gallery_image_urls.length) {
      return;
    }

    setViewImage(seller.gallery_image_urls[index]);
    setImageIndex(index);
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
      {showAltLayout && <SellerName>{seller.name}</SellerName>}

      <div className={styles.section__information}>
        <header className={styles.header__information}>
          <div className={styles.wrapper__headerInfo}>
            <div className={styles.nationality}>{cuisine_name}</div>
            <StoreLocation locations={locations} />
            {website_url && (
              <div className={styles.websiteUrl}>
                <a
                  href={`${website_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.websiteUrl}
                >
                  {website_url}
                </a>
              </div>
            )}
          </div>
          {seller.owner_image_url && showAltLayout ? (
            <img
              className={styles.ownerImage}
              src={seller?.owner_image_url}
              alt={seller.owner_name}
            />
          ) : null}
        </header>

        {showAltLayout && (
          <MobileOrderWrapper hasDeliveryOptions={deliveryService.length > 1}>
            <OrderNow
              showingAltLayout={true}
              hours={sellerHours}
              deliveryService={deliveryService}
              isMerchantOpen={isMerchantOpen}
            />
          </MobileOrderWrapper>
        )}
      </div>

      {summary && (
        <ReactMarkdown className={styles.container} source={summary} />
      )}
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
        <LeftBumper>
          <ArrowBackIosIcon
            onClick={() => {
              updateImageIndex(imageIndex - 1);
            }}
          />
        </LeftBumper>
        <img src={viewImage} alt="modal view" />
        <RightBumper>
          <ArrowForwardIosIcon
            onClick={() => {
              updateImageIndex(imageIndex + 1);
            }}
          />
        </RightBumper>
      </ImageModal>
    </section>
  );
};
const SellerName = styled.h1`
  font-weight: 600;
  font-size: 32px;
  max-width: 1200px;
  margin: 22px auto 24px auto;
  width: 100%;
  line-height: 44px;
  @media (min-width: 900px) {
    width: 100%;
    margin-top: 32px;
  }
`;
const StoreNavContainer = styled.div`
  position: relative;
  overflow-y: scroll;
  white-space: nowrap;
  -ms-overflow-style: none;

  padding-bottom: 14px;
  margin: 56px 0 30px;

  border-bottom: 1px solid #dedede;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 900px) {
    margin: 40px 0;
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

const BaseBumper = styled.button`
  position: fixed;
  top: 50%;
  border-radius: 50%;
  z-index: 2;
  height: 33px;
  width: 33px;
`;

const LeftBumper = styled(BaseBumper)`
  left: 0;
`;

const RightBumper = styled(BaseBumper)`
  right: 0;
`;
