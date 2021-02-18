import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import axios from 'axios';
import DistributorLoginView from '../pages/DistributorTools/DistributorLoginView';
import * as APIInteracts from '../utilities/api/interactionManager';
import {
  authValidate,
  authGoogle,
  authPasswordless,
} from '../utilities/api/endpoints';

const mock = new MockAdapter(axios);

const MOCK_EMAIL = 'abc@gmail.com';
const MOCK_GOOGLE_RES = { authorization_url: 'google.com' };
const MOCK_REDIRECT = 'google.com';

describe('Distributor Tools Login Page', () => {
  it('should hit the login endpoint if I submit the form', () => {
    expect.assertions(3);
    mock.onGet(authValidate).reply(200);
    mock.onGet(authPasswordless).reply(200);

    const { container } = render(<DistributorLoginView />);

    const spy = jest
      .spyOn(APIInteracts, 'requestAuthPasswordless')
      .mockImplementation(() => Promise.resolve('999'));
    const input = container.querySelector('input[type=email]');
    const submitBtn = container.querySelector(
      'form > button'
    ) as HTMLButtonElement;
    expect(submitBtn!.disabled).toBe(true);

    fireEvent.change(input!, { target: { value: MOCK_EMAIL } });
    expect(submitBtn!.disabled).toBe(false);

    fireEvent.click(submitBtn!);

    expect(spy).toHaveBeenCalledWith(MOCK_EMAIL);
  });

  it.only('should hit the Google auth endpoint if I click the Google SSO button', async () => {
    mock.onGet(authValidate).reply(200);

    const { getByText } = render(<DistributorLoginView />);
    window.open = jest.fn();
    mock.onGet(authGoogle).reply(200, MOCK_GOOGLE_RES);

    const googleBtn = getByText('Sign in with Google') as HTMLButtonElement;
    fireEvent.click(googleBtn!);

    await waitFor(() =>
      expect(window.open).toHaveBeenCalledWith(MOCK_REDIRECT, '_self')
    );
  });
});
