import React from 'react';
import { screen } from '@testing-library/dom';
import { cleanup, fireEvent } from '@testing-library/react';
import * as ModalPaymentContext from '../../../utilities/hooks/ModalPaymentContext';
import OwnerPanel from '../../OwnerPanel';
import { renderIntegration } from '../../../utilities/testing/render';
import {
  successfulSellerResponse,
  succesfulSellerHoursResponse,
  successfulSellerDeliverOptionsResponse,
} from '../../../utilities/api/__mocks__/apiReponses';

const dispatch = jest.fn();

const renderModal = (showAltLayout) =>
  renderIntegration(
    '/shunfa-bakery',
    <OwnerPanel
      seller={successfulSellerResponse}
      sellerHours={succesfulSellerHoursResponse}
      isMerchantOpen={false}
      deliveryService={successfulSellerDeliverOptionsResponse}
      showAltLayout={showAltLayout}
    />,
    '/shunfa-bakery'
  );

describe('Modal Page for payment processing', () => {
  describe('donation Interaction', () => {
    beforeEach(() => {
      jest
        .spyOn(ModalPaymentContext, 'useModalPaymentDispatch')
        .mockImplementation(() => dispatch);
      // renderModal(true);
    });
    afterEach(() => cleanup());

    test('Should display amount page for donations/giftcards', async () => {
      jest
        .spyOn(ModalPaymentContext, 'useModalPaymentState')
        .mockImplementation(() => ({ modalView: 'donation' }));
      renderModal(true);

      expect(
        screen.getByText('Donation for Shunfa Bakery')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          '100% of your support will go to the merchant toward their operating costs. Your transaction is secure, encrypted and directly goes to the owner for sustaining their business.'
        )
      ).toBeInTheDocument();
      expect(screen.getByText('Select amount')).toBeInTheDocument();
      expect(screen.getByText('$10')).toBeInTheDocument();
      expect(screen.getByText('$25')).toBeInTheDocument();
      expect(screen.getByText('$50')).toBeInTheDocument();
      expect(screen.getByText('$100')).toBeInTheDocument();
      expect(screen.getByText('Other:')).toBeInTheDocument();
    });

    test('Clicking the next button should go to payment details amount', async () => {
      jest
        .spyOn(ModalPaymentContext, 'useModalPaymentState')
        .mockImplementation(() => ({ modalView: 'donation' }));
      renderModal(true);

      fireEvent.click(screen.getByText('$10'));
      fireEvent.click(screen.getByRole('button', { name: 'Next' }));

      expect(dispatch).toHaveBeenLastCalledWith({
        type: 'SET_AMOUNT',
        payload: '10',
      });

      // const header = await screen.findByText('Complete your donation');
      // expect(header).toBeInTheDocument();
    });
  });
});
