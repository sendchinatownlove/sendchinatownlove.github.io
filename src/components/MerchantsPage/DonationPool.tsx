import * as React from 'react';
import Hero from './images/skyline-hero.png';
import Modal from '../Modal';
import { SET_MODAL_VIEW } from '../../utilities/hooks/ModalPaymentContext/constants';
import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import {
  smallScreens,
  tabletScreens,
} from '../../utilities/general/responsive';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const DonationPoolBox = () => {
  const { t } = useTranslation();
  const dispatch = useModalPaymentDispatch();

  const openModal = (e: any) => {
    e.preventDefault();
    dispatch({ type: SET_MODAL_VIEW, payload: 0 });
  };

  return (
    <div>
      <Container>
        <ColumnContainer>
          <h4>
            {t('donationPool.header')}
          </h4>
          <span>{t('donationPool.description1')}</span>
          <span>
            {t('donationPool.description2')}
          </span>{' '}
          <br />
          <button className={'button--red-filled'} onClick={openModal}>
            {t('donationPool.button')}
          </button>
        </ColumnContainer>
        <Image src={Hero} alt="banner" />

        <Modal
          purchaseType={'donation'}
          sellerId={'send-chinatown-love'}
          sellerName={'Send Chinatown Love Fund'}
          costPerMeal={0}
        />
      </Container>
    </div>
  );
};

export default DonationPoolBox;

const Container = styled.div`
  border: 1px solid #e5e5e5;
  display: flex;
  max-height: 225px;
  object-fit: cover;
  margin: 35px 3vw 55px;
  justify-content: space-between;
  @media (${tabletScreens}) {
    max-height: 550px;
  }

  @media (${smallScreens}) {
    flex-direction: column-reverse;
    margin-top: 0;
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem 1.5rem;

  @media (${tabletScreens}) {
    > span {
      margin: 2.5px;
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
