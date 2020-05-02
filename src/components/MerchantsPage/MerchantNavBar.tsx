import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 500px;
`;

interface Props {
  filterStoreType: Function;
}

const NavBar = ({ filterStoreType }: Props) => {
  const [selected, setSelected] = useState('all');

  const setStoreType = (type: any, e: any) => {
    e.preventDefault();
    setSelected(type);
    filterStoreType(type);
  };

  const storeTypes = [
    { value: 'all', text: 'All' },
    { value: 'bakery', text: 'Bakery' },
    { value: 'restaurant', text: 'Restaurant' },
    // { value: 'grocery', text: 'Grocery' },
    // { value: 'salon', text: 'Salon' },
  ];

  return (
    <React.Fragment>
      <NavContainer>
        {storeTypes.map((type) => (
          <div>
            <button
              className={
                selected === type.value
                  ? 'modalButton--filled'
                  : 'modalButton--back'
              }
              onClick={(e) => setStoreType(type.value, e)}
            >
              {type.text.toUpperCase()}
            </button>
          </div>
        ))}
      </NavContainer>
    </React.Fragment>
  );
};

export default NavBar;
