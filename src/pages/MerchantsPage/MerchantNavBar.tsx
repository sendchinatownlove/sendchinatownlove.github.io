import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface Props {
  filterStoreType: Function;
}

const NavBar = ({ filterStoreType }: Props) => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState('all');

  const setStoreType = (type: any, e: any) => {
    e.preventDefault();
    setSelected(type);
    filterStoreType(type);
  };

  const storeTypes = [
    { value: 'all', text: t('merchantNavBar.all') },
    { value: 'Brooklyn', text: t('merchantNavBar.brooklyn') },
    { value: 'New York', text: t('merchantNavBar.manhattan') },
    {
      value: 'Floral Park' || 'Flushing' || 'Queens' || 'Elmhurst',
      text: t('merchantNavBar.queens'),
    },
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
    display: grid;
    grid-template-columns: 50% 1fr;
  }
`;
