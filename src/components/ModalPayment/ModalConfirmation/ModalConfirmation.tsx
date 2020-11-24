import * as React from 'react';
import styled from 'styled-components';
import ReactPixel from 'react-facebook-pixel';

import confirmationPic from './chinatown-logo.png';

import {
  useModalPaymentState,
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
} from '../../../utilities/hooks/ModalPaymentContext';
import { LIGHT_UP_CHINATOWN_TIER_2_MIN } from '../../../consts';

import { getSeller } from '../../../utilities';

export type Props = {
  sellerId: string;
  sellerName: string;
};

const ModalConfirmation = (props: Props) => {
  const { purchaseType, amount } = useModalPaymentState(null);
  const dispatch = useModalPaymentDispatch(null);

  const closeModal = async (e: any) => {
    ReactPixel.trackCustom('ModalConfirmationButtonClick', {});
    e.preventDefault();
    // @TODO(wilsonj806) Replace the below with a proper fix
    //...for differentiating between a seller and a project
    if (props.sellerId !== 'light-up-chinatown') {
      const { data } = props.sellerId && (await getSeller(props.sellerId));
      dispatch({
        type: ModalPaymentConstants.UPDATE_SELLER_DATA,
        payload: data.amount_raised,
      });
    }
    dispatch({ type: ModalPaymentConstants.CLOSE_MODAL, payload: undefined });
  };

  const confirmationText = (purchaseType, sellerName, amount) => {
    switch (purchaseType) {
      case ModalPaymentTypes.modalPages.donation:
        return `We appreciate your support. We'll let you know when ${sellerName} receives your donation!`;
      case ModalPaymentTypes.modalPages.light_up_chinatown:
        if (amount >= LIGHT_UP_CHINATOWN_TIER_2_MIN)
          return 'You will receive an email in the next couple weeks about our Lighting Ceremony in December.';
        return `You will receive an email with receipt for your donation.`;
      case ModalPaymentTypes.modalPages.gift_card:
        return `We appreciate your support. We'll email you your voucher when ${sellerName} opens back up!`;
      case ModalPaymentTypes.modalPages.buy_meal:
        return `We appreciate your support for ${sellerName} and for those in need! Please check your email for your receipt.`;
      case ModalPaymentTypes.modalPages.mega_gam:
        // to do: Enter mega gam confirmation
        return;
      default:
        return `Unexpected occurrence.`;
    }
  };

  return (
    <Container data-testid="modal-confirmation">
      <h2>Thank you!</h2>
      <p>{confirmationText(purchaseType, props.sellerName, amount)}</p>

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
