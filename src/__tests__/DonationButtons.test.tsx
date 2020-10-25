import React from 'react';
import { renderIntegration } from '../utilities/testing/render';
import DonationButtons from '../components/DonationButtons';
import { fireEvent } from '@testing-library/react';
import { succesfulSellerResponse } from "../utilities/api/__mocks__/apiReponses";

const renderOwnerPanel = () => renderIntegration(
  '/shunfa-bakery',
  <DonationButtons 
    seller={succesfulSellerResponse} 
    showModal={false}
    active={false}
  />
);

describe('Owner Panel', () => {

  test('should show donation modal when donation button is touched', async () => {
    const { getByRole, findByText } = renderOwnerPanel()

    const DonationButton = getByRole('button', { name: 'Donation' });
    fireEvent.click(DonationButton);

    const DonationHeader = await findByText('Donation for Shunfa Bakery');
    expect(DonationHeader).toBeInTheDocument();
  });

  test('should show voucher modal when voucher button is touched', async () => {
    const { getByRole, findByText } = renderOwnerPanel()

    const VoucherButton = getByRole('button', { name: 'Voucher' });
    fireEvent.click(VoucherButton);

    const VoucherHeader = await findByText('Voucher for Shunfa Bakery');
    expect(VoucherHeader).toBeInTheDocument();
  });

  test('should show gift a meal modal when Gift a Meal is touched', async () => {
    const { getByRole, findByText } = renderOwnerPanel()

    const VoucherButton = getByRole('button', { name: 'Gift a meal' });
    fireEvent.click(VoucherButton);

    const VoucherHeader = await findByText('Gift a meal for Shunfa Bakery');
    expect(VoucherHeader).toBeInTheDocument();
  });
});
