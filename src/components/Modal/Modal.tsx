import React from 'react';
import { v4 as uuid } from 'uuid';
import ModalAmount from '../ModalAmount';
import ModalBuyMeal from '../ModalBuyMeal';
import ModalBuyMealPool from '../ModalBuyMeal/ModalBuyMealPool';
import { SquareModal } from '../ModalPayment';
import ModalConfirmation from '../ModalConfirmation';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
} from '../../utilities/hooks/ModalPaymentContext/context';
import {
  CLOSE_MODAL,
  UPDATE_SELLER_DATA,
} from '../../utilities/hooks/ModalPaymentContext/constants';
import { getSeller } from '../../utilities';
import styled from 'styled-components';
import ReactPixel from 'react-facebook-pixel';

export interface Props {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
  costPerMeal: number;
  nonProfitLocationId?: string;
}

export interface ModalProps {
  modalView: number;
}

export const Modal = (props: Props) => {
  const idempotencyKey = uuid();
  const { modalView } = useModalPaymentState();
  const dispatch = useModalPaymentDispatch();

  const closeModal = async (e: any) => {
    ReactPixel.trackCustom('ModalCloseButtonClick', {});
    e.preventDefault();
    if (modalView === 2) {
      const { data } = props.sellerId && (await getSeller(props.sellerId));
      dispatch({ type: UPDATE_SELLER_DATA, payload: data.amount_raised });
    }
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
        {modalView === 0 && props.purchaseType === 'buy_meal' && props.sellerId && (
          <ModalBuyMeal {...props} />
        )}
        {modalView === 0 && props.purchaseType === 'buy_meal' && !props.sellerId && (
          <ModalBuyMealPool {...props} />
        )}
        {modalView === 1 && (
          <SquareModal {...props} idempotencyKey={idempotencyKey} />
        )}
        {modalView === 2 && (
          <ModalConfirmation {...props} closeModal={closeModal} />
        )}
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

  max-height: 85vh;
  width: 725px;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  height: 65%;

  @media only screen and (max-width: 799px) {
    width: 85%;
  }

  @media only screen and (max-width: 450px) {
    width: 100%;
    height: 100%;
    max-height: 100%;
  }
`;
const ViewContainer = styled.div`
  overflow-y: scroll;
  margin: 0 auto;
  height: 100%;
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
