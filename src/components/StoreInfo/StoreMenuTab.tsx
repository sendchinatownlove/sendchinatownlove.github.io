import * as React from 'react';
import { BrowsePageSeller } from '../../utilities';
import styled from 'styled-components';

export interface Props {
  seller: BrowsePageSeller;
}

const StoreMenu: React.SFC<Props> = ({ seller }) => {

  return (
    <section>{<MenuImg src={seller.menu_url} alt="store-menu" />}</section>
  );
};

export default StoreMenu;

const MenuImg = styled.img`
  width: 100%;
`;
