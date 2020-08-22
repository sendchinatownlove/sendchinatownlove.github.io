import React from 'react';
import styles from './styles.module.scss';

import illustrated_flatlay_hero from '../images/illustrated_flatlay_hero.png';
import gam_icon_step1 from '../images/gam_icon_step1.svg';
import gam_icon_step2 from '../images/gam_icon_step2.svg';
import gam_icon_step3 from '../images/gam_icon_step3.svg';
import gam_icon_step4 from '../images/gam_icon_step4.svg';

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
        <div className={styles.sub}>
          <div className={styles.instructions}>
            {[
              ['Donate to Gift-a-Meal', gam_icon_step1],
              [
                '100% of donations still go directly to our merchants',
                gam_icon_step2,
              ],
              [
                'Vouchers are donated to our community parnters',
                gam_icon_step3,
              ],
              ['Partners distribute to individuals in need', gam_icon_step4],
            ].map(([text, icon], idx) => generateStep(idx + 1, text, icon))}
          </div>
        </div>
      </div>
      <br />
      <button className={styles.backButton}>Back to merchants</button>
      <h5 className={styles.campaignHeader}>Active Gift-a-Meal</h5>
      // active campaigns here
      <h5 className={styles.campaignHeader}>Past Gift-a-Meal</h5>
      // past campaigns here
    </div>
  );
};

export default GiftAMealPage;

const generateStep = (n, text, icon) => {
  return (
    <div className={styles.step} key={n}>
      <img src={icon} alt="icon" />
      <div className={styles.stepText}>
        <p>Step {n}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};
