import React from 'react';
import ModalAmount from './ModalAmount';
import ModalBuyMeal from './ModalBuyMeal';
import ModalCardDetails from './ModalCardDetails';
import ModalConfirmation from './ModalConfirmation';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
} from '../../utilities/hooks/ModalPaymentContext';
import ReactPixel from 'react-facebook-pixel';
import styled from 'styled-components';

export interface Props {
  sellerId: string;
  sellerName: string;
  costPerMeal: number;
  nonProfitLocationId?: string;
  campaignId?: string;
}

export interface ModalProps {
  modalView: number;
}

export const Modal = (props: Props) => {
  const { modalView } = useModalPaymentState(null);
  const dispatch = useModalPaymentDispatch(null);
  console.log('Modal', modalView, 'Props', props);
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
        return <div>Hey</div>; // fill in with my Modal ccomponent
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
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
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
