import React from 'react';
import { v4 as uuid } from 'uuid';
import ModalAmount from '../ModalAmount';
import ModalBuyMeal from '../ModalBuyMeal';
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
  costPerMeal: number;
}

export interface ModalProps {
  modalView: number;
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
    <ModalContainer modalView={modalView}>
      <CloseButtonContainer>
        <CloseButton onClick={closeModal}>×</CloseButton>
      </CloseButtonContainer>
      <ViewContainer>
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
      </ViewContainer>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  display: ${(props: ModalProps) => (props.modalView > -1 ? 'flex' : 'none')};
  flex-direction: column;
  margin: 0 auto;

  background-color: white;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  padding-bottom: 40px;

  width: 725px;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);

  @media only screen and (max-width: 799px) {
    width: 85%;
  }

  @media only screen and (max-width: 450px) {
    width: 100%;
    height: 100%;
  }
`;
const ViewContainer = styled.div`
  overflow-y: scroll;
  margin: 0 auto;
  height: 75vh;
  width: 100%;
  padding: 0 50px;

  @media only screen and (max-width: 450px) {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
`;
const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
const CloseButton = styled.button`
  width: 40px;
  font-weight: bold;
  font-size: 30px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
`;
