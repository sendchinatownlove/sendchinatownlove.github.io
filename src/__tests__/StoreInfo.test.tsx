import React from 'react';
import { renderIntegration } from '../utilities/testing/render';
import { StoreInfo } from '../components/StoreInfo';
import { fireEvent } from '@testing-library/react';
import {
  successfulSellerResponse,
  succesfulSellerHoursResponse,
  successfulSellerDeliverOptionsResponse,
} from '../utilities/api/__mocks__/apiReponses';

const renderStoreInfo = () =>
  renderIntegration(
    '/shunfa-bakery',
    <StoreInfo
      seller={successfulSellerResponse}
      sellerHours={succesfulSellerHoursResponse}
      isMerchantOpen={false}
      deliveryService={successfulSellerDeliverOptionsResponse}
    />
  );
describe('Store Info', () => {
  test('should display Store Info body values', async () => {
    const { getByText, getByAltText } = renderStoreInfo();

    expect(getByAltText('Shunfa Bakery Illustration')).toBeInTheDocument();
    expect(getByText('Bakery')).toBeInTheDocument();
    expect(
      getByText('In the words of the owner Ping', { exact: false })
    ).toBeInTheDocument();
  });

  test('should show share information', async () => {
    const { getByText, getByRole } = renderStoreInfo();

    const GalleryButton = getByRole('button', { name: 'share' });
    fireEvent.click(GalleryButton);

    expect(getByText('Share this merchant')).toBeInTheDocument();
    expect(getByText('FACEBOOK')).toBeInTheDocument();
    expect(getByText('TWITTER')).toBeInTheDocument();
    expect(getByText('EMAIL')).toBeInTheDocument();
    expect(getByText('COPY TO CLIPBOARD')).toBeInTheDocument();
  });
});
