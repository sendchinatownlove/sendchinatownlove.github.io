import * as React from 'react';
import { useState } from 'react';
import styles from './styles.module.scss';

const NavBar = () => {
  const [selected, setSelected] = useState('all');

  // TODO: Update buttons with shop types from database
  const storeTypes = [
    { value: 'all', text: 'All Shops' },
    // { value: 'market', text: 'Markets' },
    // { value: 'food', text: 'Foods' },
    // { value: 'salon', text: 'Salons' },
    // { value: 'shop', text: 'Shops' },
    // { value: 'stand', text: 'Stands' },
  ];

  return (
    <React.Fragment>
      <div className={styles.navContainer}>
        {storeTypes.map((type) => (
          <div>
            <button
              className={
                selected === type.value
                  ? 'modalButton--filled'
                  : 'modalButton--back'
              }
              onClick={() => setSelected(type.value)}
            >
              {type.text}
            </button>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default NavBar;
