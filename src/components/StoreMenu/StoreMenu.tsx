import * as React from 'react';
import { BrowsePageSeller } from '../../utilities';

export interface Props {
  getStoreImages: Function;
  seller: BrowsePageSeller;
}

const StoreMenu: React.SFC<Props> = ({ seller, getStoreImages }) => {
  console.log('all info', seller)
  const images = getStoreImages(seller.seller_id);

  // TODO: what should i do with this? Is there an easier way to check & just not show the link in nav bar?
  // const errorText = () => {
  //   alert('Coming soon!')
  // }

  // onError={errorText} 

  return (
    <section>
      {
        <img src={images.menu} alt="store-menu" width="100%" />
      }
    </section>
  );
};

export default StoreMenu;
