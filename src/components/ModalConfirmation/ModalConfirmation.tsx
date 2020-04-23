import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import confirmationPic from './chinatown-logo.png';

import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import { CLOSE_MODAL } from '../../utilities/hooks/ModalPaymentContext/constants';

const ModalConfirmation: React.SFC = () => {
  const dispatch = useModalPaymentDispatch();

  return (
    <div className={styles.paymentContainer}>
      <h2>Thank you!</h2>
      <p>
        We appreciate your support.<br/>
        Please check your email for your receipt.
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
