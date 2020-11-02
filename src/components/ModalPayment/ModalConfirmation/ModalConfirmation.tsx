import * as React from 'react';
import styled from 'styled-components';
import ReactPixel from 'react-facebook-pixel';

import confirmationPic from './chinatown-logo.png';

import {
  useModalPaymentState,
  useModalPaymentDispatch,
  ModalPaymentConstants,
} from '../../../utilities/hooks/ModalPaymentContext';
import { getSeller } from '../../../utilities';
export type Props = {
  sellerId: string;
  sellerName: string;
};

const ModalConfirmation = (props: Props) => {
  const { purchaseType } = useModalPaymentState(null);
  const dispatch = useModalPaymentDispatch(null);

  const closeModal = async (e: any) => {
    ReactPixel.trackCustom('ModalConfirmationButtonClick', {});
    e.preventDefault();

    const { data } = props.sellerId && (await getSeller(props.sellerId));
    dispatch({
      type: ModalPaymentConstants.UPDATE_SELLER_DATA,
      payload: data.amount_raised,
    });
    dispatch({ type: ModalPaymentConstants.CLOSE_MODAL, payload: undefined });
  };

  const confirmationText = () => {
    switch (purchaseType) {
      case 'donation':
        return `We appreciate your support. We'll let you know when ${props.sellerName} receives your donation!`;
      case 'gift_card':
        return `We appreciate your support. We'll email you your voucher when ${props.sellerName} opens back up!`;
      case 'buy_meal':
        return `We appreciate your support for ${props.sellerName} and for those in need! Please check your email for your receipt.`;
      default:
        return `Unexpected occurrence.`;
    }
  };

  return (
    <Container data-testid="modal-confirmation">
      <h2>Thank you!</h2>
      <p>{confirmationText()}</p>

      <ThankYouImage src={confirmationPic} alt="Logo" />

      <FinishButton
        className="modalButton--filled"
        onClick={(e) => closeModal(e)}
      >
        Finish
      </FinishButton>
    </Container>
  );
};

export default ModalConfirmation;

const Container = styled.div`
  max-height: 80%;
  margin-bottom: 25px;
`;

const ThankYouImage = styled.img`
  position: relative;
  width: 100%;
`;

const FinishButton = styled.button`
  position: relative;
  margin-top: 35px;
  float: right;
  right: 0px;
`;
