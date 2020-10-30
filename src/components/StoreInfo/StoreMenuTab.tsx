import * as React from 'react';
import { BrowsePageSeller } from '../../utilities/api';
import styled from 'styled-components';

export interface Props {
  seller: BrowsePageSeller;
  expandImage: Function;
}

const StoreMenu: React.SFC<Props> = ({ seller, expandImage }) => {
  return (
    <section>
      {
        <MenuImg
          src={seller.menu_url}
          alt="store-menu"
          onClick={() => expandImage(seller.menu_url)}
        />
      }
    </section>
  );
};

export default StoreMenu;

const MenuImg = styled.img`
  width: 100%;
`;
