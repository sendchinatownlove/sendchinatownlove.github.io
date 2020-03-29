import React from 'react';
import styles from './styles.module.scss';
import logoSrc from './logo.png';

function App() {
  return (
    <footer className={styles.container}>
      <div className={styles.links}>
        <a className={styles.link} href="mailto:sendchinatownlove@gmail.com">
          Email
        </a>
        <a
          className={styles.link}
          href="https://instagram.com/sendchinatownlove"
        >
          Instagram
        </a>
      </div>
      <img className={styles.logo} src={logoSrc} alt="send chinatown love" />
    </footer>
  );
}

export default App;
