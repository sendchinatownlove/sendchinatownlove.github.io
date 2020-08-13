import React from 'react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

import gam_icon_step1 from '../images/gam_icon_step1.svg';
import gam_icon_step2 from '../images/gam_icon_step2.svg';
import gam_icon_step3 from '../images/gam_icon_step3.svg';
import gam_icon_step4 from '../images/gam_icon_step4.svg';

interface Props {
  isModal: boolean;
}

const CampaignInstructions = (props: Props) => {
  const { t } = useTranslation();
  return (
    <div className={props.isModal ? styles.modalBackground : styles.background}>
      <div
        className={
          props.isModal ? styles.modalInstructionsGrid : styles.instructionsGrid
        }
      >
        {[
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
        ].map(([step, text, icon], idx) =>
          generateStep(step, text, icon, props.isModal, idx)
        )}
      </div>
    </div>
  );
};

export default CampaignInstructions;

const generateStep = (step, text, icon, isModal, idx) => {
  return (
    <div className={isModal ? styles.modalStepGrid : styles.stepGrid} key={idx}>
      <img src={icon} alt="icon" />
      <div className={isModal ? styles.modalStepText : styles.stepText}>
        <p className={styles.uppercase}>{step}</p>
        <p className={styles.bold}>{text}</p>
      </div>
    </div>
  );
};
