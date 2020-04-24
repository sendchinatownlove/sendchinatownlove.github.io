import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
} from '../../utilities/hooks/ModalPaymentContext/context';
import {
  SET_MODAL_VIEW,
  SET_AMOUNT,
  CLOSE_MODAL,
} from '../../utilities/hooks/ModalPaymentContext/constants';

interface Props {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
}

export const Modal = (props: Props) => {
  const { amount } = useModalPaymentState();
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [selected, setSelected] = useState('');
  const dispatch = useModalPaymentDispatch();

  const handleAmount = (value: string, customAmount: boolean, text: string) => {
    setSelected(text);
    setIsCustomAmount(customAmount);
    dispatch({ type: SET_AMOUNT, payload: value });
  };

  const openModal = (e: any) => {
    e.preventDefault();
    dispatch({ type: SET_MODAL_VIEW, payload: 1 });
  };

  const closeModal = (e: any) => {
    e.preventDefault();
    dispatch({ type: CLOSE_MODAL, payload: undefined });
  };

  const buttonAmounts = [
    { value: '10', text: '$10' },
    { value: '25', text: '$25' },
    { value: '50', text: '$50' },
    { value: '100', text: '$100' },
  ];

  return (
    <form
      id="donation-form"
      className={classnames(styles.donationsContainer, 'modalForm--form')}
    >
      <div>
        <h2>{props.sellerName}</h2>
        <button className={'closeButton--close'} onClick={closeModal}>
          ×
        </button>
      </div> 
      
      <p>Please select an amount or enter a custom amount</p>

      <div className={styles.amountContainer}>
        <label htmlFor="select-amount">Select an amount </label>
        <br />
        <div className={styles.selectAmtContainer}>
          {buttonAmounts.map((amount) => (
            <button
              type="button"
              className={
                selected === amount.text
                  ? 'modalButton--selected'
                  : 'modalButton--outlined'
              }
              onClick={(e) => {
                handleAmount(amount.value, false, amount.text);
              }}
            >
              {amount.text}
            </button>
          ))}
        </div>
        <label htmlFor="custom-amount">Or enter an amount </label>
        <br />
        <input
          name="custom-amount"
          type="number"
          onFocus={(e) => handleAmount('', true, '')}
          className={classnames(styles.customAmt, 'modalInput--input')}
          onChange={(e) => {
            handleAmount(e.target.value, true, '');
          }}
          value={isCustomAmount ? amount : ''}
          placeholder="$"
          min="5"
        />
        {Number(amount) < 5 && isCustomAmount && (
          <div className={styles.errorMessage}>Minimum donation amount: $5</div>
        )}
      </div>

      <button
        type="button"
        className={classnames(styles.nextBtn, 'modalButton--filled')}
        onClick={openModal}
        disabled={Number(amount) < 5}
      >
        Next
      </button>
    </form>
  );
};

export default Modal;
