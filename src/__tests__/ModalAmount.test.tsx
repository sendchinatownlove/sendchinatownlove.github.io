import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import * as ModalPaymentContext from '../utilities/hooks/ModalPaymentContext';
// import { ModalPaymentProvider } from '../utilities/hooks/ModalPaymentContext';
// import ModalPage, { Props } from '../components/ModalAmount';
import ModalPage from '../components/ModalAmount';
import { renderUnit } from '../utilities/testing/render';

const dispatch = jest.fn();

const renderModal = () => {
  return renderUnit(
    <ModalPaymentContext.ModalPaymentProvider>
      <ModalPage 
        purchaseType='donation'
        sellerId='shunfa-bakery'
        sellerName='Shunfa Bakery'
      />
    </ModalPaymentContext.ModalPaymentProvider>
  );
};

describe('Modal Page for payment processing', () => {

  beforeEach(() => jest.spyOn(ModalPaymentContext, "useModalPaymentDispatch").mockImplementation(() => dispatch));
  afterEach(() => cleanup());

  test('Should display amount page for donations/giftcards', async () => {
    const { getByText, container } = renderModal();

    const StoreHeader = getByText('Donation for Shunfa Bakery');
    const Prompt1 = getByText(
      '100% of your support will go to the merchant toward their operating costs. Your transaction is secure, encrypted and directly goes to the owner for sustaining their business.'
    );
    const Prompt2 = getByText('Select amount');
    const amount1 = getByText('$10');
    const amount2 = getByText('$25');
    const amount3 = getByText('$50');
    const amount4 = getByText('$100');
    const Prompt3 = getByText('Other:');
    const customAmount = container.querySelector("[name='custom-amount']");

    expect(StoreHeader).toBeInTheDocument();
    expect(Prompt1).toBeInTheDocument();
    expect(Prompt2).toBeInTheDocument();
    expect(amount1).toBeInTheDocument();
    expect(amount2).toBeInTheDocument();
    expect(amount3).toBeInTheDocument();
    expect(amount4).toBeInTheDocument();
    expect(Prompt3).toBeInTheDocument();
    expect(customAmount).toBeInTheDocument();
  });

  test('Clicking the next button should go to payment details amount', async () => {
    const { getByText } = renderModal();
    const amount1 = getByText('$10');
    const customAmount =  getByText('Next');

    fireEvent.click(amount1);
    fireEvent.click(customAmount);

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: "SET_AMOUNT", payload: "10" });
    expect(dispatch).toHaveBeenLastCalledWith({ type: "SET_MODAL_VIEW", payload: 1 });
  });
});
