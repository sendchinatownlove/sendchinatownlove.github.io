import React from 'react';
import { v4 as uuid } from 'uuid';
import ModalAmount from '../ModalAmount';
import { SquareModal } from '../ModalPayment';
import ModalConfirmation from '../ModalConfirmation';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
} from '../../utilities/hooks/ModalPaymentContext/context';
import { CLOSE_MODAL } from '../../utilities/hooks/ModalPaymentContext/constants';
import styled from 'styled-components';

export interface Props {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
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
    <DonationsContainer
      id="donation-form"
      className={'modalForm--form'}
      style={{ display: modalView > -1 ? 'block' : 'none' }}
    >
      <button className={'closeButton--close'} onClick={closeModal}>
        ×
      </button>
      {modalView === 0 && <ModalAmount {...props} />}
      {modalView === 1 && (
        <SquareModal {...props} idempotencyKey={idempotencyKey} />
      )}
      {modalView === 2 && <ModalConfirmation {...props} />}
    </DonationsContainer>
  );
};

export default Modal;

export const DonationsContainer = styled.div`
  height: 80%;
  overflow-y: scroll;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);

  @media only screen and (max-width: 799px) {
    width: 85%;
    height: 75vh;
    overflow-y: scroll;
  }

  @media only screen and (max-width: 450px) {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
`;
