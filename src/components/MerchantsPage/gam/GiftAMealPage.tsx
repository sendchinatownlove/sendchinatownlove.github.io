import React from 'react';
import styles from './styles.module.scss';

import illustrated_flatlay_hero from '../images/illustrated_flatlay_hero.png';
import CampaginInstructions from './CampaignInstructions'

interface Props {
  menuOpen: boolean;
}

const GiftAMealPage = (props: Props) => {

  return (
    <div
      className={styles.container}
      style={{ display: props.menuOpen ? 'none' : 'inherit' }}
    >
      <div className={styles.header}>
        <img
          src={illustrated_flatlay_hero}
          className={styles.hero}
          alt="meal overlay illustration"
        />
        <div className={styles.main}>
          <div>
            <h3 style={{ fontWeight: 'bolder' }}>Gift a Meal</h3>
            <p>
              Double the impact of your donation by gifting meals from our
              merchants to local organizations that will distribute your gifted
              meals to our community in need.
            </p>
          </div>
        </div>
        <CampaginInstructions />
      </div>
      <br />
      <button className={styles.backButton}>Back to merchants</button>
      <h5 className={styles.campaignHeader}>Active Gift-a-Meal</h5>
      
      <h5 className={styles.campaignHeader}>Past Gift-a-Meal</h5>

      
    </div>
  );
};

export default GiftAMealPage;
