import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import {
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
} from '../../../utilities/hooks/ModalPaymentContext';
import CampaignProgressBar from '../../MerchantsPage/gam/CampaignProgressBar';
import { useTranslation } from 'react-i18next';
import CampaignInstructions from './CamapignInstructions';
import ReactPixel from 'react-facebook-pixel';
import { getCampaignsForMerchant, getDistributor } from '../../../utilities';

export interface Props {
  sellerId: string;
  sellerName: string;
  costPerMeal: number;
  campaignId?: string;
}

export const ModalBuyMeal = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useModalPaymentDispatch(null);

  // set initial number of meals to 1
  const [numberOfMeals, setNumberOfMeals] = useState(1);

  const [campaign, setCampaign] = useState<any>({});
  const [campaignDistributor, setCampaignDistributor] = useState<any>([]);

  const handleAmount = (value: string, customAmount: boolean, text: string) => {
    const valueInt = parseInt(value, 10);
    setNumberOfMeals(isNaN(valueInt) ? 0 : valueInt);
    const totalMealPrice = valueInt * props.costPerMeal;
    dispatch({
      type: ModalPaymentConstants.SET_AMOUNT,
      payload: String(totalMealPrice),
    });
  };

  const openModal = (e: any) => {
    ReactPixel.trackCustom('GiftMealPaymentNextButtonClick', {
      numberOfMeals: numberOfMeals,
    });
    e.preventDefault();
    dispatch({
      type: ModalPaymentConstants.SET_MODAL_VIEW,
      payload: ModalPaymentTypes.modalPages.card_details,
    });
  };

  const totalMealPrice = numberOfMeals * props.costPerMeal;
  const totalAmount = { value: totalMealPrice, text: '$' + totalMealPrice };
  const COST_LIMIT = 10000;

  useEffect(() => {
    dispatch({
      type: ModalPaymentConstants.SET_AMOUNT,
      payload: String(totalMealPrice),
    });
    // eslint-disable-next-line
  }, []);

  // Note(wilsonj806) fetches data based on the passed in campaign id
  const fetchData = async (sellerId: string, campaignId: string) => {
    const { data } = await getCampaignsForMerchant(sellerId);

    const campaign = data.find((ele) => campaignId === ele.id);
    const { data: distrib } = await getDistributor(campaign.distributor_id);
    setCampaignDistributor(distrib);
    setCampaign(campaign);
  };

  useEffect(() => {
    if (props.campaignId) {
      fetchData(props.sellerId, props.campaignId);
    }
  }, [props.sellerId, props.campaignId]);

  const Distributor = () => (
    <>
      <a
        href={campaignDistributor.website_url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {' '}
        {campaignDistributor.name}
      </a>{' '}
    </>
  );

  const mealsRaised = Math.floor(
    campaign.amount_raised / campaign.price_per_meal
  );

  const targetMeals = Math.floor(
    campaign.target_amount / campaign.price_per_meal
  );

  return (
    <form className={styles.form}>
      <div>
        <div className={styles.header}>
          {props.sellerId
            ? t('buyMeal.header') + props.sellerName
            : t('buyMealPool.header')}
        </div>
      </div>
      <p className={styles.description}>
        {t('buyMealPool.description.weAre')}
        {/* Note(wilsonj806)Only renders one single distributor*/}
        <Distributor />
        {t('buyMealPool.description.andRestaurants')}
        <span className={styles.bold}>
          {' '}
          {t('buyMealPool.description.allItTakes')} ${props.costPerMeal}
        </span>
      </p>

      <CampaignInstructions />
      <CampaignProgressBar
        isModal={true}
        isActive={campaign.active}
        numContributions={mealsRaised}
        targetAmount={targetMeals}
        progressBarColor={'#cf6e8a'}
        lastContributionTime={new Date(campaign.last_contribution)}
        endDate={new Date(campaign.end_date)}
      />

      <div className={styles.amountContainer}>
        <label htmlFor="select-amount">{t('buyMeal.prompt')}</label>
        <br />
        <div className={styles.selectAmtContainer}>
          <div className={styles.selectAmt}>
            <input
              name="custom-amount"
              type="number"
              onFocus={(e) => handleAmount('', true, '')}
              className={classnames(styles.customAmt, 'modalInput--input')}
              onChange={(e) => {
                handleAmount(e.target.value, true, '');
              }}
              value={numberOfMeals === 0 ? '' : String(numberOfMeals)}
              placeholder="# of meals"
              min="1"
            />
            <span className={styles.separator}>✕</span>
            <button
              type="button"
              className={classnames(
                styles.costPerMeal,
                'modalButton--nonfunctional'
              )}
              disabled={true}
            >
              {'$' + props.costPerMeal}
            </button>
          </div>
          <label className={styles.total}>
            {t('buyMeal.totalLabel')} <b>{totalAmount.text}</b>
          </label>
        </div>
        <br />
      </div>

      <button
        type="button"
        className={classnames(styles.nextBtn, 'modalButton--filled')}
        onClick={openModal}
        disabled={
          numberOfMeals < 1 || numberOfMeals > COST_LIMIT / props.costPerMeal
        }
      >
        {t('paymentProcessing.amount.submit')}
      </button>
    </form>
  );
};

export default ModalBuyMeal;
