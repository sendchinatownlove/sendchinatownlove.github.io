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
            Support local Chinatown businesses during the COVID-19 pandemic and help them digitize
            them the future
          </p>
          <Link to="/about">
            <button className={styles.ctaButton}>Learn More</button>
          </Link>
        </div>
      </main>
      <Footer theme={'dark'} />
    </div>
  );
};

export default Home;
