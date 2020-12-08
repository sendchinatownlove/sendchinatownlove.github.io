import * as React from 'react';
import Modal from '../ModalPayment';
import {
  ModalPaymentConstants,
  useModalPaymentDispatch,
  ModalPaymentTypes,
} from '../../utilities/hooks/ModalPaymentContext';
import {
  smallScreens,
  tabletScreens,
} from '../../utilities/general/responsive';
import { getWebsiteImages } from '../../utilities/general/StoreImages';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ReactPixel from 'react-facebook-pixel';

const DonationPoolBox = () => {
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

  return (
    <div>
      <Container>
        <ColumnContainer>
          <h2 style={{ margin: '10px 0', fontWeight: 'bolder' }}>
            {t('donationPool.header')}
          </h2>
          <span>{t('donationPool.description1')}</span>
          <span>{t('donationPool.description2')}</span> <br />
          <button className={'button--red-filled'} onClick={openModal}>
            {t('donationPool.button')}
          </button>
        </ColumnContainer>
        <Image src={websiteImages.skyline} alt="banner" />

        <Modal
          sellerId={'send-chinatown-love'}
          sellerName={'Send Chinatown Love Fund'}
          costPerMealInDollars={0}
        />
      </Container>
    </div>
  );
};

export default DonationPoolBox;

const Container = styled.div`
  border: 1px solid #e5e5e5;
  display: flex;
  max-height: 230px;
  object-fit: cover;
  margin: 35px 0 55px;
  justify-content: space-between;

  @media (max-width: 1350px) {
    margin: 35px 35px 55px;
  }

  @media (${tabletScreens}) {
    max-height: 300px;
  }

  @media (${smallScreens}) {
    flex-direction: column-reverse;
    margin-top: 0;
    max-height: 500px;
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem 1.5rem;

  @media (${tabletScreens}) {
    > span {
      margin: 2.5px 0;
    }

    > button {
      width: 100%;
    }
  }
`;

const Image = styled.img`
  width: 48%;
  height: auto;
  object-fit: cover;
  @media (${smallScreens}) {
    width: 100%;
  }
`;
