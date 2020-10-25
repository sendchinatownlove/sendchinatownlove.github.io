import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';

import { renderIntegration } from '../utilities/testing/render';
import DonationButtons from '../components/DonationButtons';
import { successfulSellerResponse } from "../utilities/api/__mocks__/apiReponses";

const showModal = jest.fn();

const renderDonationButtons = () => renderIntegration(
  '/shunfa-bakery',
  <DonationButtons 
    seller={successfulSellerResponse} 
    showModal={showModal}
    active={true}
  />
);

describe('Donation Buttons', () => {

  afterEach(() => cleanup());

  test('should show donation modal when donation button is touched', async () => {
    const { getByRole } = renderDonationButtons();

    const DonationButton = getByRole('button', { name: 'Donation' });
    fireEvent.click(DonationButton);

    expect(showModal).toHaveBeenCalled();
    // const DonationHeader = await findByText('Donation for Shunfa Bakery');
    // expect(DonationHeader).toBeInTheDocument();
  });

  test('should show voucher modal when voucher button is touched', async () => {
    const { getByRole } = renderDonationButtons();

    const VoucherButton = getByRole('button', { name: 'Voucher' });
    fireEvent.click(VoucherButton);

    expect(showModal).toHaveBeenCalled();
    // const VoucherHeader = await findByText('Voucher for Shunfa Bakery');
    // expect(VoucherHeader).toBeInTheDocument();
  });

  test('should show gift a meal modal when Gift a Meal is touched', async () => {
    const { getByRole } = renderDonationButtons();

    const GAMButton = getByRole('button', { name: 'Gift a meal' });
    fireEvent.click(GAMButton);

    expect(showModal).toHaveBeenCalled();

    // const VoucherHeader = await findByText('Gift a meal for Shunfa Bakery');
    // expect(VoucherHeader).toBeInTheDocument();
  });
});
