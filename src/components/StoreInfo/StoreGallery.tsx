import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { BrowsePageSeller } from '../../utilities';

export interface Props {
  getStoreImages: Function;
  seller: BrowsePageSeller;
}

const StoreGallery: React.SFC<Props> = ({ seller, getStoreImages }) => {
  const images = getStoreImages(seller.seller_id);
  const gallery = images.gallery;

  const hideImage = (e) => {
    return (e.target.style.display = 'none');
  };

  const [viewImage, setViewImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const view = (url: string) => {
    setViewImage(url);
    setShowModal(true)
  }

  return (
    <GalleryContainer>
      {gallery.map((image, idx) => {
        return idx !== 0 && (
          <img
            key={image}
            src={image}
            className={`item-${idx}`}
            alt="store-menu"
            onError={hideImage}
            onClick={() => view(image)}
          />
        );
      })}
      <GalleryModal style={{ display: showModal ? 'block' : 'none' }}>
        <CloseButton onClick={() => setShowModal(false)}>
            ×
        </CloseButton>
        <img src={viewImage} alt='modal view' />
      </GalleryModal>
    </GalleryContainer>
  );
};

export default StoreGallery;

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

const GalleryModal = styled.div`
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  img {
      width: 48vw;
  }

  @media (max-width: 650px) {
      img {
          width: 95vw;
      }
  }
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 15px;

  > img {
    object-fit: cover;
    width: 225px;
    height: 225px;
    cursor: pointer;

    :hover {
        opacity: .70;
    }
  }

  .item-1 {
    grid-column: span 2;
    grid-row: span 2;
    width: 465px;
    height: 465px;
  }

  @media (max-width: 1250px) {
    > img {
      width: 200px;
      height: 200px;
    }

    .item-1 {
      grid-column: span 1;
      grid-row: span 1;
      width: 200px;
      height: 200px;
    }
  }
`;
