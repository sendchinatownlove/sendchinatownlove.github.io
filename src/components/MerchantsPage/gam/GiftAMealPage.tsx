import React, { useState } from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';
import illustrated_flatlay_hero from '../images/illustrated_flatlay_hero.png';
import CampaginInstructions from './CampaignInstructions';
import CampaignListItem from './CampaignListItem';
import Modal from '../../Modal';
import { useModalPaymentDispatch } from '../../../utilities/hooks/ModalPaymentContext/context';
import { SET_MODAL_VIEW } from '../../../utilities/hooks/ModalPaymentContext/constants';
import { useTranslation } from 'react-i18next';

interface Props {
  menuOpen: boolean;
}

const ModalBox: any = Modal;

const GiftAMealPage = (props: Props) => {
  const { t } = useTranslation();

  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [pastCampaigns, setPastCampaigns] = useState([]);

  const dispatch = useModalPaymentDispatch();
  const showModal = (event: any) => {
    dispatch({ type: SET_MODAL_VIEW, payload: 0 });
  };

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
      <button className={styles.backButton}>
        {t('gamHome.backButton')}
      </button>
      {activeCampaigns.length ? (
        <>
          <h5 className={styles.campaignHeader}>
            {t('gamHome.activeSection')}
          </h5>
          {activeCampaigns.map((campaign: any) => (
            // TODO: pass campaign data to CampaignListItem
            <CampaignListItem campaign={''} />
          ))}
        </>
      ) : (
        <div className={styles.noCampaign}>
          <div className={styles.noCampaignText}>
            <p>{t('gamHome.noCampaignsBox.CTA')}</p>
            <p>{t('gamHome.noCampaignsBox.description')}</p>
          </div>
          <button
            className={classnames('button--filled', styles.giftButton)}
            onClick={showModal}
          >
            {t('gamHome.giftButton')}
          </button>
        </div>
      )}
      <h5 className={styles.campaignHeader}>{t('gamHome.pastSection')}</h5>
      {pastCampaigns.map((campaign: any) => (
        // TODO: pass campaign data to CampaignListItem
        <CampaignListItem campaign={''} />
      ))}

      <ModalBox
        purchaseType={'buy_meal'}
        sellerId={''}
        sellerName={''}
        costPerMeal={5}
        nonProfitLocationId={''}
      />
    </div>
  );
};

export default GiftAMealPage;
