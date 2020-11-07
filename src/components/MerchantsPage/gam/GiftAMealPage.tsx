import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getCampaigns } from '../../../utilities/api';
import illustrated_flatlay_hero from '../images/illustrated_flatlay_hero.png';
import CampaignInstructions from './CampaignInstructions';
import NoActiveCampaignsBox from './NoCampaignsBox';
import CampaignListItem from './CampaignListItem';
import VideoComponent from './VideoComponent';
import { useTranslation } from 'react-i18next';

interface Props {
  menuOpen: boolean;
}

const GiftAMealPage = (props: Props) => {
  const { t } = useTranslation();

  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [pastCampaigns, setPastCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const fetchData = async () => {
    const campaignData = await getCampaigns();
    const active = campaignData.data.filter(
      (campaign: any) => campaign.active && campaign.valid
    );
    setActiveCampaigns(active);
    const past = campaignData.data
      .filter((campaign: any) => !campaign.active)
      .reverse();
    setPastCampaigns(past);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

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
        <div className={styles.headerText}>
          <h3 style={{ fontWeight: 'bolder' }}>{t('gamHome.header')}</h3>
          <p>{t('gamHome.description')}</p>
        </div>
        <CampaignInstructions />
      </div>
      <br />
      <button
        className={styles.backButton}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = '/all';
        }}
      >
        {t('gamHome.backButton')}
      </button>
      {activeCampaigns.length ? (
        <>
          <h5 className={styles.campaignHeader}>
            {t('gamHome.activeSection')}
          </h5>
          {activeCampaigns.map((campaign: any) => (
            <CampaignListItem
              campaign={campaign}
              key={campaign.id}
              selectedCampaign={selectedCampaign}
              setSelectedCampaign={setSelectedCampaign}
            />
          ))}
        </>
      ) : (
        <NoActiveCampaignsBox />
      )}

      <div className={styles.videoContainer}>
        <VideoComponent videoId="3zbqvouILto"></VideoComponent>
        <h5 className={styles.videoDescription}>
          {t('gamHome.videoBox.caption')}
        </h5>
      </div>

      <h5 className={styles.campaignHeader}>{t('gamHome.pastSection')}</h5>
      {pastCampaigns.map((campaign: any) => (
        <CampaignListItem
          campaign={campaign}
          key={campaign.id}
          selectedCampaign={selectedCampaign}
          setSelectedCampaign={setSelectedCampaign}
        />
      ))}
    </div>
  );
};

export default GiftAMealPage;
