import React from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';
import Modal from '../../Modal';
import { useModalPaymentDispatch } from '../../../utilities/hooks/ModalPaymentContext/context';
import { SET_MODAL_VIEW } from '../../../utilities/hooks/ModalPaymentContext/constants';
import { useTranslation } from 'react-i18next';

const ModalBox: any = Modal;

const NoActiveCampaignsBox = () => {
  const { t } = useTranslation();

  const dispatch = useModalPaymentDispatch();
  const showModal = (event: any) => {
    dispatch({ type: SET_MODAL_VIEW, payload: 0 });
  };

  return (
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
      <ModalBox
        purchaseType={'buy_meal'}
        sellerId={''}
        sellerName={''}
        costPerMeal={5}
        nonProfitLocationId={''}
      />
    </div>
  )
}

export default NoActiveCampaignsBox