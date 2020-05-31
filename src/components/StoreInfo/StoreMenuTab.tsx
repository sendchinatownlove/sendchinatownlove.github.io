import * as React from 'react';
import { BrowsePageSeller } from '../../utilities';

export interface Props {
  getStoreImages: Function;
  seller: BrowsePageSeller;
}

const StoreMenu: React.SFC<Props> = ({ seller, getStoreImages }) => {
  const images = getStoreImages(seller.seller_id);

  return (
    <section>{<img src={images.menu} alt="store-menu" width="100%" />}</section>
  );
};

export default StoreMenu;
