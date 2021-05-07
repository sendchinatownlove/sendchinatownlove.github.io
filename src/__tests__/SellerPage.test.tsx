import React from 'react';
import { renderIntegration } from '../utilities/testing/render';
import SellerPage from '../pages/SellerPage';

describe('Seller Page', () => {
  test('should display SellerPage with succesful GET /seller request', async () => {
    const { findByTestId, findAllByText } = renderIntegration(
      '/shunfa-bakery',
      <SellerPage menuOpen={false} showAltLayout={true} />,
      '/shunfa-bakery'
    );

    const StoryHeader = await findAllByText('Shunfa Bakery');
    const OwnerPanel = await findByTestId('owner-panel');
    const StoreInfo = await findByTestId('store-info');

    expect(StoryHeader.length).toBe(2);
    expect(OwnerPanel).toBeInTheDocument();
    expect(StoreInfo).toBeInTheDocument();
  });
});
