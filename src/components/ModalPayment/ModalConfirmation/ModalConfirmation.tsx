import React from 'react';
import styled from 'styled-components';
import ReactPixel from 'react-facebook-pixel';
import { useTranslation } from 'react-i18next';
import confirmationPic from './chinatown-logo.png';

import {
  useModalPaymentState,
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
} from '../../../utilities/hooks/ModalPaymentContext';
import useScrollToElement from '../../../utilities/hooks/useScrollToElement';
import { LIGHT_UP_CHINATOWN_TIER_2_MIN } from '../../../consts';

import { getSeller } from '../../../utilities';

export type Props = {
  sellerId: string;
  sellerName: string;
};

const lucHeroImage =
  'https://storage.cloud.google.com/sendchinatownlove-assets/public/assets/light-up-chinatown/modal-payment-confirm-hero-LUC.png';

const ModalConfirmation = (props: Props) => {
  const { purchaseType, amount } = useModalPaymentState(null);
  const dispatch = useModalPaymentDispatch(null);
  const modalRef = useScrollToElement();
  const { t } = useTranslation();

  const closeModal = async (e: any) => {
    ReactPixel.trackCustom('ModalConfirmationButtonClick', {});
    e.preventDefault();
    // @TODO(wilsonj806) Replace the below with a proper fix
    //...for differentiating between a seller and a project
    if (props.sellerId && props.sellerId !== 'light-up-chinatown') {
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
        return t('modalPayment.modalConfirmation.donation', {
          seller: sellerName,
        });
      case ModalPaymentTypes.modalPages.light_up_chinatown:
        if (amount >= LIGHT_UP_CHINATOWN_TIER_2_MIN)
          return t('modalPayment.modalConfirmation.lightUpMaxTier');
        return t('modalPayment.modalConfirmation.lightUpMinTier');
      case ModalPaymentTypes.modalPages.gift_card:
        return t('modalPayment.modalConfirmation.voucher', {
          seller: sellerName,
        });
      case ModalPaymentTypes.modalPages.buy_meal:
        return t('modalPayment.modalConfirmation.buyMeal', {
          seller: sellerName,
        });
      case ModalPaymentTypes.modalPages.mega_gam:
        return (
          <span>
            {t('modalPayment.modalConfirmation.mega_gam_line_1')}
            <br />
            <br />
            {t('modalPayment.modalConfirmation.mega_gam_line_2')}
          </span>
        );
      default:
        return `Unexpected occurrence.`;
    }
  };

  // @TODO(wilsonj806) Replace the below with a proper fix
  //...for differentiating between a seller and a project

  const confirmHeroImage =
    props.sellerId === 'light-up-chinatown' ? lucHeroImage : confirmationPic;

  return (
    <Container data-testid="modal-confirmation">
      <h2 ref={modalRef}>Thank you!</h2>
      <p>{confirmationText(purchaseType, props.sellerName, amount)}</p>

      <ThankYouImage src={confirmHeroImage} alt="Logo" />

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
  height: 100%;
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
