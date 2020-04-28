import React from 'react';
import NavBar from '../Navbar';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

interface Props {}

const ErrorPage = (props: Props) => {
  return (
    <main className={styles.container}>
      <NavBar />
      <div className={styles.textContainer}>
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
