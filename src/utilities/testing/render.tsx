import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ModalPaymentProvider } from '../../utilities/hooks/ModalPaymentContext';
import i18n from '../../i18n';

const renderIntegration = (initialPage = '', component: React.ReactNode) => {
  return render(
    <MemoryRouter initialEntries={[initialPage]}>
      <I18nextProvider i18n={i18n}>
        <ModalPaymentProvider>{component}</ModalPaymentProvider>
      </I18nextProvider>
    </MemoryRouter>
  );
};

const renderUnit = (component: React.ReactNode) => {
  return render(<I18nextProvider i18n={i18n}>{component}</I18nextProvider>);
};

export { renderIntegration, renderUnit };
