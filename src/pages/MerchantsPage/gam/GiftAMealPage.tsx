/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getCampaigns, getPastCampaigns } from '../../../utilities/api';
import type { Campaign } from '../../../utilities/api';
import illustrated_flatlay_hero from '../images/illustrated_flatlay_hero.png';
import CampaignInstructions from './CampaignInstructions';
import CampaignListItem from './CampaignListItem';
import MegaGamListItem from './MegaGamListItem/MegaGamListItem';
import NoActiveCampaignsBox from './NoCampaignsBox';
import VideoComponent from './VideoComponent';
import { Summary2021 } from './Summary2021';

import styles from './styles.module.scss';
import Loader from '../../../components/Loader';

interface Props {
  menuOpen: boolean;
}

const GiftAMealPage = (props: Props) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(true);
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [pastCampaigns, setPastCampaigns] = useState<Campaign[]>([]);
  const [currPage, setCurrPage] = useState(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalCountPastCmpgn, setTotalCountPastCmpgn] = useState(0);
  const [shouldFetchPastData, setShouldFetchPastData] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] =
    useState<number | null>(null);

  const fetchData = async () => {
    // const { data: campaignData } = await getCampaigns();
    const campaignData = [];
    setLoading(false);
    const activeMegaGam: Campaign[] = [];
    const active: Campaign[] = [];

    // Campaigns come back sorted by oldest to newest end date.
    campaignData.forEach((campaign: Campaign) => {
      if (campaign.project_id) {
        activeMegaGam.push(campaign);
      } else {
        active.push(campaign);
      }
    });

    // We want active Mega GAM campaigns to show up first and then active
    // campaigns from oldest to newest.
    setActiveCampaigns(activeMegaGam.concat(active));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchPastCmpgnData = async () => {
      const { data, headers } = await getPastCampaigns(currPage + 1);
      const totalPages = parseInt(headers['total-pages']);
      setPastCampaigns((prev) => prev.concat(data));
      setTotalPages(totalPages);
      setTotalCountPastCmpgn(headers['total-count']);
      setCurrPage(currPage + 1);
    };
    if (
      shouldFetchPastData === true &&
      (currPage < totalPages || currPage === 0)
    ) {
      fetchPastCmpgnData();
      setShouldFetchPastData(false);
    }
  }, [shouldFetchPastData, currPage, totalPages]);

  return loading ? (
    <Loader isPage={true} />
  ) : (
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

      <Summary2021 />

      <div className={styles.videoContainer}>
        <VideoComponent videoId="3zbqvouILto"></VideoComponent>
        <h5 className={styles.videoDescription}>
          {t('gamHome.videoBox.caption')}
        </h5>
      </div>
      {/* <div className={styles.pastCampaignsHeader}>
        <h5 className={styles.campaignHeading}>{t('gamHome.pastSection')}</h5>
        <span className={styles.pastCampaignsCount}>{`${
          pastCampaigns.length
        } ${t('gamHome.pastCampaignCount.ofText')} ${totalCountPastCmpgn} ${t(
          'gamHome.pastCampaignCount.pastCampaignText'
        )}`}</span>
      </div>
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
        {currPage !== totalPages && (
          <div className={styles.viewMoreBtnContainer}>
            <button
              className={styles.buttonViewMore}
              onClick={() => setShouldFetchPastData(true)}
            >
              {t('gamHome.viewMoreButton')}
            </button>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default GiftAMealPage;
