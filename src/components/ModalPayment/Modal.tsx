import React, { useEffect } from 'react';
import ModalAmount from './ModalAmount';
import ModalBuyMeal from './ModalBuyMeal';
import ModalMegaGam from './ModalMegaGam';
import ModalCardDetails from './ModalCardDetails';
import ModalConfirmation from './ModalConfirmation';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
} from '../../utilities/hooks/ModalPaymentContext';
import { getFee } from '../../utilities/api/interactionManager';

import type { Campaign } from '../../utilities/api/types';
import ReactPixel from 'react-facebook-pixel';
import styled from 'styled-components';

export interface Props {
  sellerId: string;
  sellerName: string;
  costPerMeal: number;
  nonProfitLocationId?: string;
  projectId?: number;
  campaign?: Campaign;
}

export interface ModalProps {
  modalView: number;
}

export const Modal = (props: Props) => {
  const { modalView } = useModalPaymentState(null);
  const dispatch = useModalPaymentDispatch(null);

  useEffect(() => {
    // @TODO: For now we are only applying the Square fee, but backend may eventually
    //        need a way to pass multiple fees by PaymentType/Campaign(?).
    getFee('square').then((res) => {
      if (res.status === 200) {
        const squareFee = res.data;

        if (squareFee && squareFee.active) {
          dispatch({
            type: ModalPaymentConstants.SET_FEES,
            payload: [squareFee],
          });
        }
      }
    });
  }, [dispatch]);

  const closeModal = async (e: any) => {
    ReactPixel.trackCustom('ModalCloseButtonClick', {});
    e.preventDefault();
    dispatch({ type: ModalPaymentConstants.CLOSE_MODAL, payload: undefined });
  };

  const renderModalPage = (type) => {
    switch (type) {
      case ModalPaymentTypes.modalPages.donation:
      case ModalPaymentTypes.modalPages.gift_card:
      case ModalPaymentTypes.modalPages.light_up_chinatown:
        return <ModalAmount {...props} />;
      case ModalPaymentTypes.modalPages.buy_meal:
        return <ModalBuyMeal {...props} />;
      case ModalPaymentTypes.modalPages.card_details:
        return <ModalCardDetails {...props} />;
      case ModalPaymentTypes.modalPages.confirmation:
        return <ModalConfirmation {...props} />;
      case ModalPaymentTypes.modalPages.mega_gam:
        return <ModalMegaGam {...props} />;
      default:
        return;
    }
  };

  return (
    <ModalContainer modalView={modalView}>
      <CloseButtonContainer>
        <CloseButton onClick={closeModal}>×</CloseButton>
      </CloseButtonContainer>
      <ViewContainer>{renderModalPage(modalView)}</ViewContainer>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  display: ${(props: ModalProps) => (props.modalView ? 'flex' : 'none')};
  flex-direction: column;
  margin: 0 auto;

  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  padding-bottom: 40px;
  width: 100%;
  height: 100%;
`;
const ViewContainer = styled.div`
  overflow-y: scroll;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  padding: 0 4%;
  @media min-width: 1000px {
    padding: 0 50px;
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
