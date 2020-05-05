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
        <h1 className={styles.mainHeader}>Dumpling Not Found!</h1>
        <h3 className={styles.subHeader}>
          The page you are trying to access does not exist or has been moved.
        </h3>
        <h3 className={styles.subHeader}>Try going back to the homepage.</h3>
        <p className={styles.backToHome}>
          <Link to="/">PLEASE GO TO HOMEPAGE</Link>
        </p>
      </div>
    </main>
  );
};

export default ErrorPage;
