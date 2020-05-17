import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import confirmationPic from './chinatown-logo.png';
import { useTranslation } from 'react-i18next';

import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import { CLOSE_MODAL } from '../../utilities/hooks/ModalPaymentContext/constants';

export type Props = {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
};

const ModalConfirmation = (props: Props) => {
  const dispatch = useModalPaymentDispatch();
  const { t } = useTranslation();

  return (
    <div className={styles.container} data-testid="Modal Confirmation">
      <h2>{t('paymentProcessing.confirmation.header')}</h2>
      <p>
        {t('paymentProcessing.confirmation.subHeader1')}
        {props.purchaseType === 'gift_card'
          ? `${t('paymentProcessing.confirmation.voucherText1')}${
              props.sellerName
            }${t('paymentProcessing.confirmation.voucherText2')}`
          : `${t('paymentProcessing.confirmation.donationText1')}${
              props.sellerName
            }${t('paymentProcessing.confirmation.donationText2')}`}
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
