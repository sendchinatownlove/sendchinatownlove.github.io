import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  tabletScreens,
  phoneScreens,
} from '../../utilities/general/responsive';

import Modal from '../ModalPayment';

import {
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
} from '../../utilities/hooks/ModalPaymentContext';
import {
  LIGHT_UP_CHINATOWN_TIER_2_MIN,
  LIGHT_UP_CHINATOWN_TIER_3_MIN,
} from '../../consts';

const DonationSection = () => {
  const { t } = useTranslation();

  const ModalPaymentDispatcher = useModalPaymentDispatch(null);

  const openModal = (event) => {
    event.preventDefault();
    ModalPaymentDispatcher({
      type: ModalPaymentConstants.SET_MODAL_VIEW,
      payload: ModalPaymentTypes.modalPages.light_up_chinatown,
    });
  };
  return (
    <React.Fragment>
      <Container>
        <ColumnContainer>
          <Title>{t('lightUpChinatown.donationTitle')}</Title>
          <br></br>
          <br></br>
          <Description>
            {t('lightUpChinatown.donationDescription1')}
          </Description>
          <br></br>
          <Description>
            {t('lightUpChinatown.donationDescription2', {
              limit_1: LIGHT_UP_CHINATOWN_TIER_2_MIN,
              limit_2: LIGHT_UP_CHINATOWN_TIER_3_MIN,
            })}
          </Description>
        </ColumnContainer>
        <ColumnContainer>
          <Button className={'button--filled'} onClick={openModal}>
            {t('donationBox.button')}
          </Button>
        </ColumnContainer>
      </Container>
      <Modal
        sellerId="light-up-chinatown"
        sellerName="Light Up Chinatown"
        costPerMealInDollars={0}
      />
    </React.Fragment>
  );
};

export default DonationSection;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1440px;
  margin: auto;
  @media (${tabletScreens}) {
    flex-direction: column;
    position: relative;
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  @media (${tabletScreens}) {
    padding: 5px;
  }
`;

const Title = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  letter-spacing: 0.02em;
  color: #000000;
  @media (${phoneScreens}) {
    font-size: 22px;
  }
`;

const Description = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: #1e1e1e;
  @media (${phoneScreens}) {
    font-size: 13px;
  }
`;

const Button = styled.div`
  text-align: center;
  line-height: 40px;
  width: 380px;
  height: 60px;
  cursor: pointer;
  margin: 80px 0px 0px 0px;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.05em;
  @media (${phoneScreens}) {
    font-size: 14px;
    width: 100%;
    margin: 16px 0px 16px 0px;
  }
`;
