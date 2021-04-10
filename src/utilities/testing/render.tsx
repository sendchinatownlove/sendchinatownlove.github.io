jest.mock('../../utilities/api/interactionManager');
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as typeof ReactRouterDom),
  useParams: () => ({ id: 'shunfa-bakery' }),
}));

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as ReactRouterDom from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ModalPaymentProvider } from '../../utilities/hooks/ModalPaymentContext';
import i18n from '../../i18n';
import '../../../__mocks__/matchMedia.mock';

const renderIntegration = (
  initialPage = '',
  component: React.ReactNode,
  route?: any
) => {
  return render(
    <ReactRouterDom.MemoryRouter initialEntries={[initialPage]}>
      <I18nextProvider i18n={i18n}>
        <ReactRouterDom.Route path={route}>
          <ModalPaymentProvider>{component}</ModalPaymentProvider>
        </ReactRouterDom.Route>
      </I18nextProvider>
    </ReactRouterDom.MemoryRouter>
  );
};

const renderUnit = (component: React.ReactNode) => {
  return render(<I18nextProvider i18n={i18n}>{component}</I18nextProvider>);
};

export { renderIntegration, renderUnit };
