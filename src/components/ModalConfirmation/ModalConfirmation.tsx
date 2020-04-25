import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import confirmationPic from './chinatown-logo.png';

import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import { CLOSE_MODAL } from '../../utilities/hooks/ModalPaymentContext/constants';

type Props = {
  sellerName: string;
};

const ModalConfirmation = ({ sellerName }: Props) => {
  const dispatch = useModalPaymentDispatch();

  return (
    <div className={styles.container}>
      <h2>Thank you!</h2>
      <p>
        We appreciate your support. Please check your email for your receipt.
      </p>
      <p>
        We will let your know when {sellerName} receives your donation, and will email you when {sellerName} opens back up!
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
