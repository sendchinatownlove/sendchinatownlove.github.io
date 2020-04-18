import * as React from 'react';
import { useState } from 'react';
import styles from './styles.module.scss';

const NavBar = () => {
  const [selected, setSelected] = useState('all');

  return (
    <React.Fragment>
      <div className={styles.navContainer}>
        <button
          className={
            selected === 'all' ? 'modalButton--filled' : 'modalButton--back'
          }
          onClick={() => setSelected('all')}
        >
          All Shops
        </button>

          {/* hidden until ready to use */}
        {/* <button
          className={
            selected === 'bakeries'
              ? 'modalButton--filled'
              : 'modalButton--back'
          }
          onClick={() => setSelected('bakeries')}
        >
          Bakeries
        </button>

        <button
          className={
            selected === 'markets' ? 'modalButton--filled' : 'modalButton--back'
          }
          onClick={() => setSelected('markets')}
        >
          Markets
        </button>

        <button
          className={
            selected === 'foods' ? 'modalButton--filled' : 'modalButton--back'
          }
          onClick={() => setSelected('foods')}
        >
          Foods
        </button>

        <button
          className={
            selected === 'salons' ? 'modalButton--filled' : 'modalButton--back'
          }
          onClick={() => setSelected('salons')}
        >
          Salons
        </button>

        <button
          className={
            selected === 'shops' ? 'modalButton--filled' : 'modalButton--back'
          }
          onClick={() => setSelected('shops')}
        >
          Shops
        </button>

        <button
          className={
            selected === 'stands' ? 'modalButton--filled' : 'modalButton--back'
          }
          onClick={() => setSelected('stands')}
        >
          Stands
        </button> */}
      </div>
    </React.Fragment>
  );
};

export default NavBar;
