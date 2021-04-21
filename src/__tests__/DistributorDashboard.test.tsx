import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import axios from 'axios';
import DistributorDashboard from '../pages/DistributorTools/DistributorDashboard';
import * as APIInteracts from '../utilities/api/interactionManager';
import { vouchers20Count, vouchersMetadata } from '../utilities/api/endpoints';
import renderWithRouter, {
  resetRouterFixture,
} from '../utilities/testing/renderWithRouter';

const mock = new MockAdapter(axios);

const STARTING_PATH = '/distributor/dashboard';

describe.only('Distributor Tools Table Page', () => {
  afterEach(() => {
    resetRouterFixture();
  });
  it("should redirect if the server can't validate an existing session", async () => {
    const endingPath = '/distributor/login';
    mock.onGet(vouchersMetadata).reply(401);

    const spy = jest.spyOn(APIInteracts, 'getVoucherMetadata');

    const { getByText } = renderWithRouter(<DistributorDashboard />, {
      startingPath: STARTING_PATH,
      endingPath,
    });

    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
      expect(getByText(endingPath)).toBeInTheDocument();
    });
  });

  it('should hit the metadata endpoint and grab voucher data on page load', async () => {
    const h1Text = 'Distributor Dashboard: Gift-a-Meal Tracker';
    mock.onGet(vouchers20Count).reply(200);
    mock.onGet(vouchersMetadata).reply(200);
    const MOCK_METADATA = {
      data: { count: 1, sum: 3, updated_at: '2021-04-10' },
    };
    const MOCK_DATA = {
      data: { gift_cards: [], seller_names: [] },
      headers: { 'total-pages': 3 },
    };

    const spy = jest
      .spyOn(APIInteracts, 'getVoucherMetadata')
      .mockImplementation(() => Promise.resolve(MOCK_METADATA));
    const spy2 = jest
      .spyOn(APIInteracts, 'getCurrentPageVouchers')
      .mockImplementation(() => Promise.resolve(MOCK_DATA));

    const { getByText } = renderWithRouter(<DistributorDashboard />, {
      startingPath: STARTING_PATH,
      endingPath: STARTING_PATH,
    });

    expect(getByText(h1Text)).toBeInTheDocument();
    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
    });
  });
  // it('should hit the login endpoint if I submit the form', () => {
  //   expect.assertions(3);
  //   mock.onGet(authValidate).reply(401);
  //   mock.onGet(authPasswordless).reply(200);

  //   const { container } = render(<DistributorLoginView />);

  //   const spy = jest
  //     .spyOn(APIInteracts, 'requestAuthPasswordless')
  //     .mockImplementation(() => Promise.resolve('999'));
  //   const input = container.querySelector('input[type=email]');
  //   const submitBtn = container.querySelector(
  //     'form > button'
  //   ) as HTMLButtonElement;
  //   expect(submitBtn!.disabled).toBe(true);

  //   fireEvent.change(input!, { target: { value: MOCK_EMAIL } });
  //   expect(submitBtn!.disabled).toBe(false);

  //   fireEvent.click(submitBtn!);

  //   expect(spy).toHaveBeenCalledWith(MOCK_EMAIL);
  // });
});
