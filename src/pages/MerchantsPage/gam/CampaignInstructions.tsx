import React from 'react';
import styles from './styles.module.scss';

import step1 from '../images/new_gam_icons/step1.png';
import step2 from '../images/new_gam_icons/step2.png';
import step3 from '../images/new_gam_icons/step3.png';
import step4 from '../images/new_gam_icons/step4.png';
import step5 from '../images/new_gam_icons/step5.png';

const CampaignInstructions = () => {
  const newSteps = [
    ['STEP 1:', 'Donate to Gift-a-Meal via our website', step1],
    [
      'STEP 2:',
      '100% of donations go directly to Merchants as revenue - they then prepare and pack meals',
      step2,
    ],
    [
      'STEP 3:',
      'SCL coordinates pick-up time between Merchants and Distributors/SCL Volunteers',
      step3,
    ],
    [
      'STEP 4:',
      'Items are delivered to drop off points in Manhattan, Brooklyn, Queens (non-profits, food shelters, among others!)',
      step4,
    ],
    ['STEP 5:', 'Community members pick up meals', step5],
  ];

  return (
    <div className={styles.background}>
      <div className={styles.instructionsGrid}>
        {newSteps.map(([step, text, icon], idx) =>
          generateStep(step, text, icon, idx)
        )}
      </div>
    </div>
  );
};

export default CampaignInstructions;

const generateStep = (step, text, icon, idx) => {
  return (
    <div className={styles.stepGrid} key={idx}>
      <img src={icon} alt="icon" />
      <div className={styles.stepText}>
        <p className={styles.uppercase}>{step}</p>
        <p className={styles.bold}>{text}</p>
      </div>
    </div>
  );
};
