import React from 'react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

import gam_icon_step1 from '../images/gam_icon_step1.svg';
import gam_icon_step2 from '../images/gam_icon_step2.svg';
// import gam_icon_step3 from '../images/gam_icon_step3.svg';
import gam_icon_step4 from '../images/gam_icon_step4.svg';

const CampaignInstructions = () => {
  const { t } = useTranslation();

  /* keeping old steps
  const oldSteps = [
    [
      `${t('gamHome.subheading.step1')}`,
      `${t('gamHome.subheading.step1Text')}`,
      gam_icon_step1,
    ],
    [
      `${t('gamHome.subheading.step2')}`,
      `${t('gamHome.subheading.step2Text')}`,
      gam_icon_step2,
    ],
    [
      `${t('gamHome.subheading.step3')}`,
      `${t('gamHome.subheading.step3Text')}`,
      gam_icon_step3,
    ],
    [
      `${t('gamHome.subheading.step4')}`,
      `${t('gamHome.subheading.step4Text')}`,
      gam_icon_step4,
    ],
  ];
  */

  const newSteps = [
    [
      `${t('gamHome.subheading.step1')}`,
      `${t('gamHome.subheading.step1Text')}`,
      gam_icon_step1,
    ],
    [
      `${t('gamHome.subheading.step2')}`,
      'We partner with local merchants to provide meals',
      gam_icon_step2,
    ],
    [
      'STEP 3:',
      'Partners distribute these meals to individuals in need',
      gam_icon_step4,
    ],
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
