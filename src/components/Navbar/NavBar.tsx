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
        <Link to="/" className={styles.navLink}>
          HOME
        </Link>
        <Link to="/sellers" className={styles.navLink}>
          MERCHANTS
        </Link>
        <Link to="/about" className={styles.navLink}>
          ABOUT US
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
