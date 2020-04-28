import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import sclLogo from '../../images/logo-with-text.png';

interface Props {}

const NavBar = (props: Props) => {
  return (
    <div className={styles.navBarContainer}>
      <img className={styles.image} src={sclLogo} alt="Logo" />
      <div className={styles.navLinksContainer}>
        <div className={styles.navLink}>
          <Link to="/">HOME</Link>
        </div>
        <div className={styles.navLink}>
          <Link to="/sellers">MERCHANTS</Link>
        </div>
        <div className={styles.navLink}>
          <Link to="/about">ABOUT US</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
