import React from 'react';
import classnames from 'classnames';
import { v4 as uuid } from 'uuid';
import styles from './styles.module.scss';
import ModalAmount from '../ModalAmount';
import ModalBuyMeal from '../ModalBuyMeal';
import { SquareModal } from '../ModalPayment';
import ModalConfirmation from '../ModalConfirmation';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
} from '../../utilities/hooks/ModalPaymentContext/context';
import { CLOSE_MODAL } from '../../utilities/hooks/ModalPaymentContext/constants';

export interface Props {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
  costPerMeal: number;
}

const idempotencyKey = uuid();

export const Modal = (props: Props) => {
  const { modalView } = useModalPaymentState();
  const dispatch = useModalPaymentDispatch();

  const closeModal = (e: any) => {
    e.preventDefault();
    dispatch({ type: CLOSE_MODAL, payload: undefined });
  };

  return (
    <div
      id="donation-form"
      className={classnames(styles.donationsContainer, 'modalForm--form')}
      style={{ display: modalView > -1 ? 'block' : 'none' }}
    >
      <button className={'closeButton--close'} onClick={closeModal}>
        ×
      </button>
      {modalView === 0 && props.purchaseType !== 'buy_meal' && (
        <ModalAmount {...props} />
      )}
      {modalView === 0 && props.purchaseType === 'buy_meal' && (
        <ModalBuyMeal {...props} />
      )}
      {modalView === 1 && (
        <SquareModal {...props} idempotencyKey={idempotencyKey} />
      )}
      {modalView === 2 && <ModalConfirmation {...props} />}
    </div>
  );
};

export default Modal;
