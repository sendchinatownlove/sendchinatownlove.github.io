import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getCampaigns } from '../../../utilities/api';
import type { Campaign } from '../../../utilities/api';
import illustrated_flatlay_hero from '../images/illustrated_flatlay_hero.png';
import CampaignInstructions from './CampaignInstructions';
import CampaignListItem from './CampaignListItem';
import MegaGamListItem from './MegaGamListItem/MegaGamListItem';
import NoActiveCampaignsBox from './NoCampaignsBox';
import VideoComponent from './VideoComponent';

import styles from './styles.module.scss';

interface Props {
  menuOpen: boolean;
}

const GiftAMealPage = (props: Props) => {
  const { t } = useTranslation();

  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [pastCampaigns, setPastCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(
    null
  );

  const fetchData = async () => {
    const campaignResponse = await getCampaigns();
    const activeMegaGam: Campaign[] = [];
    const active: Campaign[] = [];
    const past: Campaign[] = [];

    // Campaigns come back sorted by oldest to newest end date.
    campaignResponse.data.forEach((campaign: Campaign) => {
      if (campaign.active && campaign.valid) {
        if (campaign.project_id) {
          activeMegaGam.push(campaign);
        } else {
          active.push(campaign);
        }
      } else {
        past.push(campaign);
      }
    });

    // We want active Mega GAM campaigns to show up first and then active
    // campaigns from oldest to newest.
    setActiveCampaigns(activeMegaGam.concat(active));
    // Inactive campaigns should show up newest to oldest.
    setPastCampaigns(past.reverse());
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
      <div className={styles.campaignsContainer}>
        {activeCampaigns.length ? (
          <>
            {activeCampaigns.map((campaign: Campaign) =>
              campaign.project_id ? (
                <MegaGamListItem campaign={campaign} key={campaign.id} />
              ) : (
                <CampaignListItem
                  campaign={campaign}
                  key={campaign.id}
                  selectedCampaignId={selectedCampaignId}
                  setSelectedCampaignId={setSelectedCampaignId}
                />
              )
            )}
          </>
        ) : (
          <NoActiveCampaignsBox />
        )}
      </div>

      <div className={styles.videoContainer}>
        <VideoComponent videoId="3zbqvouILto"></VideoComponent>
        <h5 className={styles.videoDescription}>
          {t('gamHome.videoBox.caption')}
        </h5>
      </div>

      <h5 className={styles.campaignHeader}>{t('gamHome.pastSection')}</h5>
      <div className={styles.campaignsContainer}>
        {pastCampaigns.map((campaign: Campaign) =>
          campaign.project_id ? (
            <MegaGamListItem campaign={campaign} key={campaign.id} />
          ) : (
            <CampaignListItem
              campaign={campaign}
              key={campaign.id}
              selectedCampaignId={selectedCampaignId}
              setSelectedCampaignId={setSelectedCampaignId}
            />
          )
        )}
      </div>
    </div>
  );
};

export default GiftAMealPage;
