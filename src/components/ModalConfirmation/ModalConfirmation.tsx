import * as React from 'react';
import classnames from 'classnames';
import confirmationPic from './chinatown-logo.png';
import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import { CLOSE_MODAL } from '../../utilities/hooks/ModalPaymentContext/constants';
import styles from './styles.module.scss';

export type Props = {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
};

const ModalConfirmation = (props: Props) => {
  const dispatch = useModalPaymentDispatch();

  return (
    <div className={styles.container} data-testid="Modal Confirmation">
      <h2>Thank you!</h2>
      <p>
        We appreciate your support. We'll{' '}
        {props.purchaseType === 'gift_card'
          ? `email you your voucher when ${props.sellerName} opens back up!`
          : `let you know when ${props.sellerName} receives your donation!`}
      </p>

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
