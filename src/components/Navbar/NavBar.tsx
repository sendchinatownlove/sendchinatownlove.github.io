import React, { useState, useEffect, Dispatch } from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import sclLogo from '../../images/logo-with-text.png';

interface Props {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = (props: Props) => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 767) {
      setHamburgerOpen(true);
    } else {
      setHamburgerOpen(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 767) {
      setHamburgerOpen(true);
    } else {
      setHamburgerOpen(false);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showCompactMenu = () => {
    return !props.menuOpen ? (
      <MenuIcon onClick={(e) => props.setMenuOpen(true)} />
    ) : (
      <div className={styles.navLinksCompactContainer}>
        <div className={styles.navBarContainer}>
          <img className={styles.image} src={sclLogo} alt="Logo" />
          <CloseIcon
            onClick={(e) => props.setMenuOpen(false)}
            className={styles.closeIcon}
          />
        </div>
        <a
          href="https://sendchinatownlove.com/"
          className={styles.navCompactLink}
        >
          HOME
        </a>
        <Link to="/sellers" className={styles.navCompactLink}>
          MERCHANTS
        </Link>
        <Link to="/about" className={styles.navCompactLink}>
          ABOUT US
        </Link>
      </div>
    );
  };

  return (
    <div className={styles.navBarContainer}>
      <img className={styles.image} src={sclLogo} alt="Logo" />
      {hamburgerOpen ? (
        showCompactMenu()
      ) : (
        <div className={styles.navLinksContainer}>
          <a href="https://sendchinatownlove.com/" className={styles.navLink}>
            HOME
          </a>
          <Link to="/sellers" className={styles.navLink}>
            MERCHANTS
          </Link>
          <Link to="/about" className={styles.navLink}>
            ABOUT US
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
