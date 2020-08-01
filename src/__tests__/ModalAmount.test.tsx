import React from 'react';
import ModalPage from '../components/ModalAmount';
import { renderUnit } from '../utilities/testing/render';
// import { cleanup, fireEvent } from '@testing-library/react';

describe('Modal Page for payment processing', () => {
  test('Should display amount page for donations/giftcards', async () => {
    const { getByText, getByDisplayValue } = renderUnit(
      <ModalPage
        purchaseType="donation"
        sellerId="shunfa-bakery"
        sellerName="Shunfa Bakery"
      />
    );

    const StoreHeader = getByText('Shunfa Bakery', { exact: false });
    const Prompt1 = getByText(
      'Please select an amount or enter a custom amount',
      { exact: false }
    );
    const Prompt2 = getByText('Select an amount');
    const amount1 = getByText('$10');
    const amount2 = getByText('$25');
    const amount3 = getByText('$50');
    const amount4 = getByText('$100');
    const customAmount = getByDisplayValue('5');
    const Prompt3 = getByText('Or enter any amount');

    expect(StoreHeader).toBeInTheDocument();
    expect(Prompt1).toBeInTheDocument();
    expect(Prompt2).toBeInTheDocument();
    expect(amount1).toBeInTheDocument();
    expect(amount2).toBeInTheDocument();
    expect(amount3).toBeInTheDocument();
    expect(amount4).toBeInTheDocument();
    expect(customAmount).toBeInTheDocument();
    expect(Prompt3).toBeInTheDocument();
    expect(customAmount).toBeInTheDocument();
  });

  // test('Clicking the next button should go to payment details amount', async () => {
  //   const { getByText, findByRole } = renderUnit(
  //     <ModalPage purchaseType='donation' sellerId='shunfa-bakery' sellerName='Shunfa Bakery' />
  //   )
  //   const amount1 = getByText('$10');
  //   const customAmount = getByText('Next');

  //   fireEvent.click(amount1);
  //   fireEvent.click(customAmount);
  //   const click = await findByRole('button', {name: "n"});

  //   expect(click).toBeInTheDocument();
  // });
});
