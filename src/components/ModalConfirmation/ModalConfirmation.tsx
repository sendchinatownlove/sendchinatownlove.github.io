import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import confirmationPic from './chinatown-logo.png';

import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import { CLOSE_MODAL } from '../../utilities/hooks/ModalPaymentContext/constants';

export type Props = {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
};

const ModalConfirmation = (props: Props) => {
  const dispatch = useModalPaymentDispatch();
  const confirmationText = () => {
    switch (props.purchaseType) {
      case 'donation':
        return `We appreciate your support. We'll let you know when ${props.sellerName} receives your donation!`;
      case 'gift_card':
        return `We appreciate your support. We'll email you your voucher when ${props.sellerName} opens back up!`;
      case 'buy_meal':
        return `We appreciate your support for ${props.sellerName} and for those in need! Please check your email for your receipt.`;
      default:
        return `We appreciate your support. We'll email you your voucher when ${props.sellerName} opens back up!`;
    }
  };

  return (
    <div className={styles.container} data-testid="Modal Confirmation">
      <h2>Thank you!</h2>
      <p>{confirmationText()}</p>

      <img className={styles.image} src={confirmationPic} alt="Logo" />

      <button
        className={classnames(styles.finishBtn, 'modalButton--filled')}
        onClick={() => dispatch({ type: CLOSE_MODAL, payload: undefined })}
      >
        Finish
      </button>
    </div>
  );
};

export default ModalConfirmation;
