import * as React from 'react';
import styles from './styles.module.scss';
import Footer from '../Footer';
import { Link } from 'react-router-dom';

const Home: React.SFC = () => {
  return (
    <div className={styles.container}>
      <main className={styles.contentContainer}>
        <div className={styles.introContainer}>
          <h1 className={styles.headerText}>Chinatown needs your help</h1>
          <p className={styles.introText}>
            Support local Chinatown businesses during the COVID-19 pandemic and
            help us bring their stores online
          </p>
          <div className={styles.btnContainer}>
            <Link to="/about">
              <button className={styles.learnMoreButton}>Learn More</button>
            </Link>
            <Link to="/sellers">
              <button className={styles.merchantsButton}>View Merchants</button>
            </Link>
          </div>
        </div>
      </main>
      <Footer theme={'dark'} />
    </div>
  );
};

export default Home;
