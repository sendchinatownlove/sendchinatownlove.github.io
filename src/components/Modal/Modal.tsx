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
import { phoneScreens, tabletScreens } from '../../utilities/general/responsive';
import styled from 'styled-components';

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
    <DonationsContainer
      id="donation-form"
      className={'modalForm--form'}
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
    </DonationsContainer>
  );
};

export default Modal;

export const DonationsContainer = styled.div`
  height: 80%;
  overflow-y: scroll;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  z-index: 10;

  @media only screen and (${tabletScreens}) {
    width: 85%;
    height: 75vh;
    overflow-y: scroll;
  }

  @media only screen and (${phoneScreens}) {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
`;
