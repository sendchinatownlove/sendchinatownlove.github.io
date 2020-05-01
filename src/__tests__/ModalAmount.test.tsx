import React from 'react';
import { ModalPaymentProvider, useModalPaymentDispatch } from '../utilities/hooks/ModalPaymentContext/context';
import ModalPage, {Props} from '../components/ModalAmount';
import { render, fireEvent } from '@testing-library/react';

jest.mock('../utilities/hooks/ModalPaymentContext/context', () => {
  return {
    ...jest.requireActual('../utilities/hooks/ModalPaymentContext/context'),
    useModalPaymentDispatch: jest.fn(() => jest.fn())
  };
});

const renderModal = (props : Props) => {
  return render(
    <ModalPaymentProvider >
      <ModalPage {...props}/>
    </ModalPaymentProvider>
  )
}

describe('Modal Page for payment processing', () => {

  test('Should display amount page for donations/giftcards', async () => {
    const { getByText, getByPlaceholderText } = renderModal({
      purchaseType: "donation",
      sellerId: "shdunfa-bakery",
      sellerName: "Shunfa Bakery"
    });

    const StoreHeader =  getByText('Shunfa Bakery');
    const Prompt1 = getByText('Please select an amount or enter a custom amount');
    const Prompt2 = getByText('Select an amount');
    const amount1 = getByText('$10');
    const amount2 = getByText('$25');
    const amount3 = getByText('$50');
    const amount4 = getByText('$100');
    const Prompt3 = getByText('Or enter an amount');
    const customAmount =  getByPlaceholderText('$');

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

  // test('Clicking the next button should go to payment details amount', async () => {
  //   const { getByText } = renderModal({
  //     purchaseType: "donation",
  //     sellerId: "shunfa-bakery",
  //     sellerName: "Shunfa Bakery"
  //   });
  //   const amount1 = getByText('$10');
  //   const customAmount =  getByText('Next');

  //   fireEvent.click(amount1);
  //   fireEvent.click(customAmount);

  //   expect(useModalPaymentDispatch).toHaveBeenCalledWith({ type: "CLOSE_MODAL", payload: undefined });
  // });
});
