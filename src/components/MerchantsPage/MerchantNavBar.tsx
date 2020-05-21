import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

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
    { value: 'Bakery', text: 'Bakery' },
    { value: 'Chinese', text: 'Restaurant' },
    // { value: 'grocery', text: 'Grocery' },
    // { value: 'salon', text: 'Salon' },
  ];

  return (
    <React.Fragment>
      <NavContainer>
        {storeTypes.map((type) => (
          <div key={type.value}>
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

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  margin-bottom: 50px;

  @media (max-width: 599px) {
    margin: 25px 0;
  }

  @media (max-width: 450px) {
    display: none;
  }
`;
