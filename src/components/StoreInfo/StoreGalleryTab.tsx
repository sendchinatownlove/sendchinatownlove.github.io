import * as React from 'react';
import styled from 'styled-components';
import { BrowsePageSeller } from '../../utilities';

export interface Props {
  seller: BrowsePageSeller;
  expandImage: Function;
}

const StoreGallery: React.SFC<Props> = ({ seller, expandImage }) => {
  const gallery = seller.gallery_image_urls;

  return gallery.length > 0 ? (
    <GalleryContainer>
      {gallery.map((image, idx) => {
        return (
          <img
            key={image}
            src={image}
            className={`item-${idx + 1}`}
            alt="store-menu"
            onClick={() => expandImage(image)}
          />
        );
      })}
    </GalleryContainer>
  ) : (
    <React.Fragment>Stay tuned, photos coming soon!</React.Fragment>
  );
};

export default StoreGallery;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 15px;
  max-width: 632px;

  > img {
    object-fit: cover;
    width: 200px;
    height: 200px;
    cursor: pointer;

    :hover {
      opacity: 0.7;
    }
  }

  .item-1 {
    grid-column: span 2;
    grid-row: span 2;
    width: 415px;
    height: 415px;
  }

  @media (max-width: 1290px) {
    .item-1 {
      grid-column: span 1;
      grid-row: span 1;
      width: 200px;
      height: 200px;
    }
  }

  @media (max-width: 1175px) {
    max-width: 100%;

    > img {
      width: 100%;
    }

    .item-1 {
      width: 100%;
    }
  }

  @media (max-width: 450px) {
    > img {
      height: 250px;
    }

    .item-1 {
      height: 250px;
    }
  }
`;
