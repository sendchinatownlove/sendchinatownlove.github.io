import React, { useState } from 'react';
import styles from './styles.module.scss';
import illustrated_flatlay_hero from '../images/illustrated_flatlay_hero.png';
import CampaginInstructions from './CampaignInstructions';
import NoActiveCampaignsBox from './NoCampignsBox'
import CampaignListItem from './CampaignListItem';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";

interface Props {
  menuOpen: boolean;
}



const GiftAMealPage = (props: Props) => {
  const { t } = useTranslation();
  const history = useHistory()

  const [activeCampaigns, setActiveCampaigns] = useState([ ]);
  const [pastCampaigns, setPastCampaigns] = useState([]);

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
        <div className={styles.header_text}>
          <div>
            <h3 style={{ fontWeight: 'bolder' }}>{t('gamHome.header')}</h3>
            <p>{t('gamHome.description')}</p>
          </div>
        </div>
        <CampaginInstructions isModal={false} />
      </div>
      <br />
      <button 
        className={styles.backButton}
        onClick={history.goBack}
      >
        {t('gamHome.backButton')}
      </button>
      {activeCampaigns.length ? (
        <>
          <h5 className={styles.campaignHeader}>
            {t('gamHome.activeSection')}
          </h5>
          {activeCampaigns.map((campaign: any) => (
            // TODO: pass campaign data to CampaignListItem
            <CampaignListItem campaign={'shunfa-bakery'} />
          ))}
        </>
      ) : <NoActiveCampaignsBox />}
      <h5 className={styles.campaignHeader}>{t('gamHome.pastSection')}</h5>
      {pastCampaigns.map((campaign: any) => (
        // TODO: pass campaign data to CampaignListItem
        <CampaignListItem campaign={''} />
      ))}
    </div>
  );
};

export default GiftAMealPage;


