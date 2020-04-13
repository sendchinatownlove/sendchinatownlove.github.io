import * as React from 'react';
import MenuItem from '../MenuItem';

interface Item {
  name: string;
  description: string;
  imageSrc?: string;
}

export interface Props {
  menuItems: Item[];
}

const StoreMenu: React.SFC<Props> = ({ menuItems }) => {
  return (
    <section>
      {menuItems.map((item, index) => {
        return <MenuItem {...item} key={`menu-item-${index}`} />;
      })}
    </section>
  );
};

export default StoreMenu;
