import React from 'react';
import { renderIntegration } from '../utilities/testing/render';
import OwnerPanel from '../components/OwnerPanel';
import { fireEvent } from '@testing-library/react';
import { succesfulSellerResponse, succesfulSellerHoursResponse, successfulSellerDeliverOptionsResponse } from "../utilities/api/__mocks__/apiReponses";

const renderOwnerPanel = () => renderIntegration(
  '/shunfa-bakery',
  <OwnerPanel 
    seller={succesfulSellerResponse} 
    sellerHours={succesfulSellerHoursResponse}
    isMerchantOpen={false}
    deliveryService={successfulSellerDeliverOptionsResponse}
  />
);

describe('Owner Panel', () => {
  test('should display Owner Panel Display body values', async () => {
    const { getByText, getByAltText } = renderOwnerPanel()

    expect(getByText('Shunfa Bakery')).toBeInTheDocument();
    expect(getByAltText('Shunfa Bakery')).toBeInTheDocument();

    expect(getByText('$230 of $10,000')).toBeInTheDocument();
    expect(getByText('7')).toBeInTheDocument();
    expect(getByText('supporters')).toBeInTheDocument();
  });
  
});
