import * as React from 'react';
import Modal from '../../components/ModalPayment';
import {
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
} from '../../utilities/hooks/ModalPaymentContext';
import { smallScreens } from '../../utilities/general/responsive';
import { getWebsiteImages } from '../../utilities/general/StoreImages';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ReactPixel from 'react-facebook-pixel';
import { useWindowSize } from '../../utilities/hooks/helpers';

const DonationHighlightBox = () => {
  const websiteImages = getWebsiteImages();
  const { t } = useTranslation();
  const dispatch = useModalPaymentDispatch(null);

  const openModal = (e: any) => {
    ReactPixel.trackCustom('DonationPoolButtonClick', {});
    e.preventDefault();
    dispatch({
      type: ModalPaymentConstants.SET_MODAL_VIEW,
      payload: ModalPaymentTypes.modalPages.donation,
    });
  };

  const containerClickHandler =
    useWindowSize().width < 600 ? openModal : () => {};

  return (
    <Container>
      <div onClick={containerClickHandler}>
        <Image src={websiteImages.donationPoolHero} alt="banner" />

        <ColumnContainer>
          <Header>{t('donationBox.header')}</Header>
          <Description>{t('donationBox.description')}</Description>
        </ColumnContainer>
      </div>

      <Button className={'button--outlined'} onClick={openModal}>
        {t('donationBox.button')}
      </Button>

      <Modal
        sellerId={'send-chinatown-love'}
        sellerName={'Send Chinatown Love Fund'}
        costPerMealInDollars={0}
      />
    </Container>
  );
};

export default DonationHighlightBox;

const Container = styled.div`
  flex-direction: column;
  float: left;
  align-items: center;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  display: flex;
  max-height: 400px;
  max-width: 550px;
  object-fit: cover;
  overflow: hidden;
  justify-content: space-between;
  -moz-box-shadow: 0 0 7px #ccc;
  -webkit-box-shadow: 0 0 7px #ccc;
  box-shadow: 0 0 7px #ccc;

  @media (${smallScreens}) {
    max-height: 340px;
    max-width: 180px;
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 30px 32px 36px 32px;

  @media (${smallScreens}) {
    padding: 16px 18px;
    max-height: 340px;
    max-width: 180px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;

  @media (${smallScreens}) {
    height: 120px;
  }
`;

const Header = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.02em;
  margin-bottom: 16px;

  @media (${smallScreens}) {
    font-size: 14px;
    line-height: 19px;
  }
`;

const Description = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0.02em;

  @media (${smallScreens}) {
    font-size: 12px;
    line-height: 16px;
  }
`;

const Button = styled.div`
  text-align: center;
  width: 75%;
  letter-spacing: 0.15em;
  cursor: pointer;
  margin-bottom: 24px;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.05em;

  @media (${smallScreens}) {
    visibility: hidden;
  }
`;
