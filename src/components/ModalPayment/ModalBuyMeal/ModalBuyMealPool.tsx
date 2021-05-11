import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import {
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
} from '../../../utilities/hooks/ModalPaymentContext';
import CampaignProgressBar from '../../../pages/MerchantsPage/gam/CampaignProgressBar';
import { Trans, useTranslation } from 'react-i18next';
import CampaignInstructions from './CamapignInstructions';
import ReactPixel from 'react-facebook-pixel';
import { getCampaignsForMerchant, getDistributor } from '../../../utilities';
import { SIZE_TYPE } from '../../../pages/MerchantsPage/gam/ProgressBar';

export interface Props {
  sellerId: string;
  sellerName: string;
  costPerMealInDollars: number;
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
    const MAX_VALUE = COST_LIMIT / props.costPerMealInDollars;
    const newNumberOfMeals = Math.min(MAX_VALUE, parseInt(value, 10));
    setNumberOfMeals(isNaN(newNumberOfMeals) ? 0 : newNumberOfMeals);
    const totalMealPrice = newNumberOfMeals * props.costPerMealInDollars;
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

  const totalMealPrice = numberOfMeals * props.costPerMealInDollars;
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

  return (
    <form className={styles.form} data-testid="ModalBuyMeal">
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
          {t('buyMealPool.description.allItTakes')} $
          {props.costPerMealInDollars}
        </span>
      </p>

      <CampaignInstructions />
      <CampaignProgressBar
        isModal={true}
        endDate={campaign.end_date}
        isActive={campaign.active}
        pricePerMealInCents={campaign.price_per_meal}
        targetAmountInCents={campaign.target_amount}
        size={SIZE_TYPE.LARGE}
        totalRaisedInCents={campaign.amount_raised}
      />

      <div className={styles.amountContainer}>
        <Trans
          i18nKey="buyMeal.prompt"
          values={{ sellerName: props.sellerName }}
          components={{ bold: <span className={styles.bold} /> }}
        >
          <label htmlFor="select-amount">{t('buyMeal.prompt')}</label>
        </Trans>
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
              {'$' + props.costPerMealInDollars}
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
          numberOfMeals < 1 ||
          numberOfMeals > COST_LIMIT / props.costPerMealInDollars
        }
      >
        {t('paymentProcessing.amount.submit')}
      </button>
    </form>
  );
};

export default ModalBuyMeal;
