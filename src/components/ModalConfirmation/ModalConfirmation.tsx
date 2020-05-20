import * as React from 'react';
import confirmationPic from './chinatown-logo.png';
import styled from 'styled-components';

export type Props = {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
  closeModal: Function;
};

const ModalConfirmation = (props: Props) => {
  const confirmationText = () => {
    switch (props.purchaseType) {
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
    <Container data-testid="Modal Confirmation">
      <h2>Thank you!</h2>
      <p>{confirmationText()}</p>

      <ThankYouImage src={confirmationPic} alt="Logo" />

      <FinishButton
        className="modalButton--filled"
        onClick={(e) => props.closeModal(e)}
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
