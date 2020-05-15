import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';

const renderIntegration = (initialPage = '', component: React.ReactNode) => {
  return render(
    <MemoryRouter initialEntries={[initialPage]}>{component}</MemoryRouter>
  );
};

export { renderIntegration };
