import * as React from 'react';
import confirmationPic from './chinatown-logo.png';
import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import {
  CLOSE_MODAL,
  UPDATE_SELLER_DATA,
} from '../../utilities/hooks/ModalPaymentContext/constants';
import { getSeller } from '../../utilities';
import styled from 'styled-components';

export type Props = {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
};

const ModalConfirmation = (props: Props) => {
  const dispatch = useModalPaymentDispatch();
  const confirmationText = () => {
    switch (props.purchaseType) {
      case 'donation':
        return `We appreciate your support. We'll let you know when ${props.sellerName} receives your donation!`;
      case 'gift_card':
        return `We appreciate your support. We'll email you your voucher when ${props.sellerName} opens back up!`;
      case 'buy_meal':
        return `We appreciate your support for ${props.sellerName} and for those in need! Please check your email for your receipt.`;
      default:
        return `Thank you for your support.`;
    }
  };

  const finishModal = async (e: any) => {
    e.preventDefault();
    const { data } = props.sellerId && (await getSeller(props.sellerId));
    dispatch({ type: UPDATE_SELLER_DATA, payload: data.amount_raised });
    dispatch({ type: CLOSE_MODAL, payload: undefined });
  };

  return (
    <Container data-testid="Modal Confirmation">
      <h2>Thank you!</h2>
      <p>{confirmationText()}</p>

      <ThankYouImage src={confirmationPic} alt="Logo" />

      <FinishButton
        className="modalButton--filled"
        onClick={(e) => finishModal(e)}
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
