import React from 'react';
import classnames from 'classnames';
import { v4 as uuid } from 'uuid';
import styles from './styles.module.scss';
import ModalAmount from '../ModalAmount';
import { SquareModal } from '../ModalPayment';
import ModalConfirmation from '../ModalConfirmation';
import ModalBilling from '../ModalBilling';
import { useModalPaymentState } from '../../utilities/hooks/ModalPaymentContext/context';

interface Props {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
}

const idempotencyKey = uuid();

export const Modal = (props: Props) => {
  const { modalView } = useModalPaymentState();

  return (
    <div
      id="donation-form"
      className={classnames(styles.donationsContainer, 'modalForm--form')}
      style={{ display: modalView > -1 ? 'block' : 'none' }}
    >
      {modalView === 0 && <ModalAmount {...props} />}
      {modalView === 1 && <ModalBilling />}
      {modalView === 2 && (
        <SquareModal {...props} idempotencyKey={idempotencyKey} />
      )}
      {modalView === 3 && <ModalConfirmation {...props} />}
    </div>
  );
};

export default Modal;
