import React from 'react';
import styles from './styles.module.scss';
import logoSrc from './logo.png';

function App() {
  return (
    <footer className={styles.container}>
      <div className={styles.links}>

        <span className={"fa fa-envelope"} />
        <a 
          className={styles.link} 
          href="mailto:sendchinatownlove@gmail.com"
        >
          Email
        </a>
        <span className={"fa fa-instagram"} />
        <a
          className={styles.link}
          href="https://instagram.com/sendchinatownlove"
        >
          Instagram
        </a>
        <span className={"fa fa-facebook"} />
        <a
          className={styles.link}
          href="https://www.facebook.com/Send-Chinatown-Love-100872288240891/"
        >
          Facebook
        </a>
      </div>
      <img className={styles.logo} src={logoSrc} alt="send chinatown love" />
    </footer>
  );
}

export default App;
