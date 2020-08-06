import React, { useState } from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';
import illustrated_flatlay_hero from '../images/illustrated_flatlay_hero.png';
import CampaginInstructions from './CampaignInstructions';
import CampaignListItem from './CampaignListItem';

interface Props {
  menuOpen: boolean;
}

const GiftAMealPage = (props: Props) => {
  const [activeCampaigns, setActiveCampaigns] = useState([]);
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
            <h3 style={{ fontWeight: 'bolder' }}>Gift a Meal</h3>
            <p>
              Double the impact of your donation by gifting meals from our
              merchants to local organizations that will distribute your gifted
              meals to our community in need.
            </p>
          </div>
        </div>
        <CampaginInstructions />
      </div>
      <br />
      <button className={styles.backButton}>Back to merchants</button>
      {
        activeCampaigns.length
          ? <>
              <h5 className={styles.campaignHeader}>Active Gift-a-Meal</h5>
              {activeCampaigns.map((campaign: any) => (
                // TODO: pass campaign data to CampaignListItem
                <CampaignListItem campaign={''} />
              ))}
            </>
          : <div className={styles.noCampaign}>
              <div className={styles.noCampaignText}>
                <p>No active campaigns? You can still donate!</p>
                <p>Meal donations here will automatically be applied to our next campaign.</p>
              </div>
              <button 
                className={classnames("button--filled", styles.giftButton)}
              >
                Gift Meal
              </button>
            </div>
      }
      <h5 className={styles.campaignHeader}>Past Gift-a-Meal</h5>
      {pastCampaigns.map((campaign: any) => (
        // TODO: pass campaign data to CampaignListItem
        <CampaignListItem campaign={''} />
      ))}
    </div>
  );
};

export default GiftAMealPage;