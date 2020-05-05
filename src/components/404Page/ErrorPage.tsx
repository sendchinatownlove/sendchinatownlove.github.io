import React, { useState } from 'react';
import NavBar from '../Navbar';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import ErrorImage from '../../images/404-error-image.png';

interface Props {}

const ErrorPage = (props: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className={styles.container}>
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div
        className={styles.textContainer}
        style={{ display: menuOpen ? 'hidden' : 'flex' }}
      >
        <img src={ErrorImage} className={styles.errorImage} alt="error" />
        <h1 className={styles.mainHeader}>
          Sorry Your Dumpling Was Not Found!
        </h1>
        <h3 className={styles.subHeader}>
          The page you are trying does not exist or has been moved.
        </h3>
        <h3 className={styles.subHeader}>
          Please try going back to the homepage.
        </h3>
        <p className={styles.backToHome}>
          <a href="https://sendchinatownlove.com/">GO TO HOMEPAGE</a>
        </p>
      </div>
    </main>
  );
};

export default ErrorPage;
