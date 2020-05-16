import * as React from 'react';
import { SET_MODAL_VIEW } from '../../utilities/hooks/ModalPaymentContext/constants';
import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
// import {
//   phoneScreens,
//   tabletScreens,
// } from '../../utilities/general/responsive';
// import Modal from '../Modal';
import styled from 'styled-components';
import Hero from './images/hero.png';

// const ModalBox: any = Modal;

const DonationPoolBox = () => {
  const dispatch = useModalPaymentDispatch();

  const openModal = (e: any) => {
    e.preventDefault();
    dispatch({ type: SET_MODAL_VIEW, payload: 0 });
  };

  return (
    <React.Fragment>
      <Container>
        <ColumnContainer>
          <h4>
            Checked out our merchants but not sure who to donate to first?
          </h4>
          <span>You can support by donating to our donation pool!</span>
          <span>
            All donations will be distributed evenly to our merchants.
          </span>{' '}
          <br />
          <button onClick={openModal}>
            SUPPORT CHINATOWN
          </button>
        </ColumnContainer>
        <Image src={Hero} alt="banner" />
      </Container>

      {/* <ModalBox
        purchaseType={'donation'}
        sellerId={'send-chinatown-love'}
        sellerName={'Send Chinatown Love Fund'}
      /> */}
    </React.Fragment>
  );
};

export default DonationPoolBox;

const Container = styled.div`
  border: 1px solid #e5e5e5;
  display: flex;
  max-height: 225px;
  object-fit: cover;
  margin: 35px 10vw 65px 7vw;
  justify-content: space-between;
  @media (max-width: 899px) {
    max-height: 250px;
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25em 2rem 1.5rem;
`;

const Image = styled.img`
  width: 48%;
  height: auto;
  object-fit: cover;
  @media (max-width: 599px) {
    display: none;
  }
`;