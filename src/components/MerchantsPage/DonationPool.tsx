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
          <h2 style={{margin: '10px 0', fontWeight: 'bolder'}}>
            {t(
              'Checked out our merchants but not sure who to donate to first?'
            )}
          </h2>
          <span>{t('You can support by donating to our donation pool!')}</span>
          <span>
            {t('All donations will be distributed evenly to our merchants.')}
          </span>{' '}
          <br />
          <button className={'button--red-filled'} onClick={openModal}>
            {t('SUPPORT CHINATOWN')}
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
