import React from 'react';
import { renderIntegration } from '../utilities/testing/render';
import OwnerPanel from '../components/OwnerPanel';
import {
  successfulSellerResponse,
  succesfulSellerHoursResponse,
  successfulSellerDeliverOptionsResponse,
} from '../utilities/api/__mocks__/apiReponses';

const renderOwnerPanel = (showAltLayout) =>
  renderIntegration(
    '/shunfa-bakery',
    <OwnerPanel
      seller={successfulSellerResponse}
      sellerHours={succesfulSellerHoursResponse}
      isMerchantOpen={false}
      deliveryService={successfulSellerDeliverOptionsResponse}
      showAltLayout={showAltLayout}
    />
  );

describe('Owner Panel', () => {
  test('should display Owner Panel Display body values for alternate view', async () => {
    const { getByText, getByAltText } = renderOwnerPanel(true);

    expect(getByText('Shunfa Bakery')).toBeInTheDocument();
    expect(getByAltText('Shunfa Bakery')).toBeInTheDocument();

    expect(getByText('$230 of $10,000')).toBeInTheDocument();
    expect(getByText('7')).toBeInTheDocument();
    expect(getByText('supporters')).toBeInTheDocument();
  });

  test('should display Owner Panel Display body values for regular view', async () => {
    const { queryByText, queryByAltText, getByText } = renderOwnerPanel(false);

    expect(queryByText('Shunfa Bakery')).not.toBeInTheDocument();
    expect(queryByAltText('Shunfa Bakery')).not.toBeInTheDocument();

    expect(queryByText('$230 of $10,000')).toBeInTheDocument();
    expect(getByText('7')).toBeInTheDocument();
    expect(getByText('supporters')).toBeInTheDocument();
  });
});
