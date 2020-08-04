import React from 'react';
import styles from './styles.module.scss';

import gam_icon_step1 from '../images/gam_icon_step1.svg';
import gam_icon_step2 from '../images/gam_icon_step2.svg';
import gam_icon_step3 from '../images/gam_icon_step3.svg';
import gam_icon_step4 from '../images/gam_icon_step4.svg';

const GiftAMeal = () => {
    return (
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
    )
}

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

export default GiftAMeal