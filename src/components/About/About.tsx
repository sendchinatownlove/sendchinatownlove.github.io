import * as React from 'react';
import styles from './styles.module.scss';
import Footer from '../Footer';

const About: React.SFC = () => {
  return (
    <div className={styles.container}>
      <main>
        <div className={styles.introContainer}>
          <h1 className={styles.headerText}>Send Chinatown Love</h1>
          <div className={styles.introTextSection}>
            <p className={styles.introText}>
              Once a bustling location known for its delicious food, fresh
              produce, and affordable prices – NYC’s Chinatown has now become
              completely barren. Although many businesses have been affected by
              the recent COVID-19 outbreak, Chinatown has had it the worst.
              Chinatown businesses have been facing declines in business due to
              discrimination and racism weeks before other restuarants felt
              similar effects of COVID-19 on sales. Immigrant owners who
              typically don’t speak English and their dependence on a cash-only
              system have put them at an even greater disadvantage of surviving
              through this pandemic. <br></br> <br></br>
              They were there for you on those late 4am nights you barely
              remember, or the next morning when you were desperately seeking a
              fresh bowl of noodle soup and cold tea. To all the tourists and
              locals alike who have visited NYC’s Chinatown and were mesmerized
              by the ambience and enjoyed it’s services. Be there for your
              Chinatown. The time to help is now.
            </p>
          </div>
          <a href="mailto:hello@sendchinatownlove.com">
            <button className={styles.ctaButton}>Work with us</button>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
