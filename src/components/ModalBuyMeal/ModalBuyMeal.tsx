import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import {
  SET_MODAL_VIEW,
  SET_AMOUNT,
} from '../../utilities/hooks/ModalPaymentContext/constants';
import { useTranslation } from 'react-i18next';
import walletImage from './wallet.png';
import cardImage from './card.png';

export interface Props {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
  costPerMeal: number;
}

export const Modal = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useModalPaymentDispatch();
  const [numberOfMeals, setNumberOfMeals] = useState(0);

  const handleAmount = (value: string, customAmount: boolean, text: string) => {
    const valueInt = parseInt(value, 10);
    setNumberOfMeals(isNaN(valueInt) ? 0 : valueInt);
    const totalMealPrice = valueInt * props.costPerMeal;
    dispatch({ type: SET_AMOUNT, payload: String(totalMealPrice) });
  };

  const openModal = (e: any) => {
    e.preventDefault();
    dispatch({ type: SET_MODAL_VIEW, payload: 1 });
  };

  const totalMealPrice = numberOfMeals * props.costPerMeal;
  const totalAmount = { value: totalMealPrice, text: '$' + totalMealPrice };

  return (
    <form
      id="donation-form"
      className={classnames(styles.donationsContainer, 'modalForm--form')}
      data-testid="Modal Amount"
    >
      <div>
        <h1>{t('buyMeal.header') + props.sellerName}</h1>
      </div>
      <p>{t('buyMeal.subheader')}</p>

      <div className={styles.illustrationsContainer}>
        <img
          src={walletImage}
          alt={'How it works'}
          className={styles.illustrationLeading}
        />
        <img
          src={cardImage}
          alt={'How it works'}
          className={styles.illustrationTrailing}
        />
      </div>
      <div className={styles.explantionContainer}>
        <p className={styles.explanation}>{t('buyMeal.explanationFirst')}</p>
        <p className={styles.explanation}>{t('buyMeal.explanationSecond')}</p>
      </div>

      <div className={styles.amountContainer}>
        <label htmlFor="select-amount">{t('buyMeal.prompt')}</label>
        <br />
        <div className={styles.selectAmtContainer}>
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
            className={'modalButton--nonfunctional'}
            disabled={true}
          >
            {'$' + props.costPerMeal}
          </button>
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
        disabled={numberOfMeals < 1}
      >
        {t('paymentProcessing.amount.submit')}
      </button>
    </form>
  );
};

export default Modal;
