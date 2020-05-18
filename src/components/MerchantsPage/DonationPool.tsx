import * as React from 'react';
import Hero from './images/hero.png';
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
            {t('Checked out our merchants but not sure who to donate to first?')}
          </h4>
          <span>{t('You can support by donating to our donation pool!')}</span>
          <span>
            {t('All donations will be distributed evenly to our merchants.')}
          </span>{' '}
          <br />
          <button className={'button--red-filled'} onClick={openModal}>
            {t('SUPPORT CHINATOWN')}
          </button>
          <Modal
            purchaseType={'donation'}
            sellerId={'send-chinatown-love'}
            sellerName={'Send Chinatown Love Fund'}
            costPerMeal={0}
          />
        </ColumnContainer>
        <Image src={Hero} alt="banner" />
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
  margin: 35px 10vw 55px 7vw;
  justify-content: space-between;
  @media (${tabletScreens}) {
    max-height: 350px;
    margin-right: 7vw;
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
    display: none;
  }
`;
