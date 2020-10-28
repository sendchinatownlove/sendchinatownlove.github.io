import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import {
  useModalPaymentDispatch,
  ModalPaymentConstants,
} from '../../utilities/hooks/ModalPaymentContext';
import { useTranslation } from 'react-i18next';
import CampaignInstructions from './CamapignInstructions';
import ReactPixel from 'react-facebook-pixel';
import { getCampaignsForMerchant, getDistributor } from '../../utilities';

export interface Props {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
  costPerMeal: number;
}

export const Modal = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useModalPaymentDispatch(null);

  // set initial number of meals to 1
  const [numberOfMeals, setNumberOfMeals] = useState(1);

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
    dispatch({ type: ModalPaymentConstants.SET_MODAL_VIEW, payload: 1 });
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

  const fetchData = async (sellerId: string) => {
    // Note(wilsonj806) Showing the campaign that expires first
    // will need to update this if we render multiple distributors
    const { data } = await getCampaignsForMerchant(sellerId);
    const { data: distrib } = await getDistributor(data[0].distributor_id);
    setCampaignDistributor(distrib);
  };

  useEffect(() => {
    fetchData(props.sellerId);
  }, [props.sellerId]);

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
    <form data-testid="ModalBuyMeal">
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

export default Modal;
