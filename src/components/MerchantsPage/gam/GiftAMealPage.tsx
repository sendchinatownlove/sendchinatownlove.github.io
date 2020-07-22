import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import CampaignListItem from './CampaignListItem'

import gam_hero from '../images/gam_hero.png'
import gam_1 from '../images/gam_1.svg'
import gam_2 from '../images/gam_2.svg'
import gam_3 from '../images/gam_3.svg'
import gam_4 from '../images/gam_4.svg'

interface Props {
    menuOpen: boolean;
}

const GiftAMealPage = (props: Props) => {
    const { t, i18n } = useTranslation();

    return (
        <div 
            className={styles.container}
            style={{ display: props.menuOpen ? 'none' : 'inherit' }}    
        >

            <div className={styles.header}>
                <img
                    src={gam_hero}
                    className={styles.hero}
                    alt="meal overlay illustration"
                />
                <div className={styles.main}>
                    <div>
                        <h3 style={{ fontWeight: 'bolder' }}>Gift a Meal</h3>
                        <p>Double the impact of your donation by gifting meals from our merchants to local organizations that will distribute your gifted meals to our community in need.</p>
                    </div>
                </div>
                <div className={styles.sub}>
                    <div className={styles.instructions}>
                        {
                            [
                                ['Donate to Gift-a-Meal', gam_1],
                                ['100% of donations still go directly to our merchants', gam_2],
                                ['Vouchers are donated to our community parnters', gam_3],
                                ['Partners distribute to individuals in need', gam_4],
                            ].map(([text, icon], idx) => generateStep(idx + 1, text, icon))
                        }
                    </div>
                </div>
            </div>
            
            <br />
            <button className={styles.backButton}>Back to merchants</button>

            <h5 className={styles.campaignHeader}>Active Gift-a-Meal</h5>

            <CampaignListItem />
        </div>
    )
}

export default GiftAMealPage

const generateStep = (n, text, icon) => {
    return <div className={styles.step} key={n} >
        <img src={icon} alt="icon" />
        <div className={styles.stepText}>
            <p>Step {n}</p>
            <p>{text}</p>
        </div>
    </div>
}