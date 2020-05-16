import * as React from 'react';
import confirmationPic from './chinatown-logo.png';
import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import { CLOSE_MODAL } from '../../utilities/hooks/ModalPaymentContext/constants';
import styled from 'styled-components';

export type Props = {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
};

const ModalConfirmation = (props: Props) => {
  const dispatch = useModalPaymentDispatch();

  return (
    <Container data-testid="Modal Confirmation">
      <h2>Thank you!</h2>
      <p>
        We appreciate your support. We'll{' '}
        {props.purchaseType === 'gift_card'
          ? `email you your voucher when ${props.sellerName} opens back up!`
          : `let you know when ${props.sellerName} receives your donation!`}
      </p>

      <ThankYouImage src={confirmationPic} alt="Logo" />

      <FinishButton
        className='modalButton--filled'
        onClick={() => dispatch({ type: CLOSE_MODAL, payload: undefined })}
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
