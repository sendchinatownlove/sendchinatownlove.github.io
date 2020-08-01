import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { VoucherProvider } from '../../utilities/hooks/VoucherContext';
import { ModalPaymentProvider } from '../../utilities/hooks/ModalPaymentContext';

const renderIntegration = (initialPage = '', component: React.ReactNode) => {
  return render(
    <MemoryRouter initialEntries={[initialPage]}>{component}</MemoryRouter>
  );
};

const renderUnit = (component: React.ReactNode) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <VoucherProvider>
        <ModalPaymentProvider>{component}</ModalPaymentProvider>
      </VoucherProvider>
    </I18nextProvider>
  );
};

export { renderIntegration, renderUnit };
