import { createBrowserHistory } from 'history';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { lazy, Suspense, useState } from 'react';
import ReactGA from 'react-ga';
import Loader from '../Loader';
import Header from '../Navbar';
import Footer from '../Footer';
import { ModalPaymentProvider } from '../../utilities/hooks/ModalPaymentContext/context';
import { VoucherProvider } from '../../utilities/hooks/VoucherContext/context';

const trackingId = process.env.REACT_APP_API_ENDPOINT!;
// For Testing purposes: https://github.com/react-ga/react-ga/issues/322
if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize(trackingId);
}

const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen((location) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  }
});

// we could use template strings, but just to be safe we'll hardcode the
// lazy imports
const SellerPage = lazy(() => import('../SellerPage'));
const MerchantsPage = lazy(() => import('../MerchantsPage'));
const ErrorPage = lazy(() => import('../404Page'));
const VoucherRedemptionPage = lazy(() =>
  import('../../pages/VoucherRedemption')
);

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const returnComponent = (child) => {
    let component;
    switch (child) {
      case 'all':
        component = <MerchantsPage menuOpen={menuOpen} />;
        break;
      case 'merchants':
        component = <Redirect to="/all" />;
        break;
      case 'seller':
        component = <SellerPage menuOpen={menuOpen} />;
        break;
      default:
        component = <ErrorPage menuOpen={menuOpen} />;
        break;
    }

    return (
      <>
        <ModalPaymentProvider>
          <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          {component}
          <Footer menuOpen={menuOpen} />
        </ModalPaymentProvider>
      </>
    );
  };

  return (
    <Router history={history}>
      <Suspense fallback={<Loader isPage={true} />}>
        <Switch>
          <Route path="/all">{returnComponent('all')}</Route>
          <Route path="/voucher">
            <VoucherProvider>
              <VoucherRedemptionPage />
            </VoucherProvider>
          </Route>
          <Route path="/merchants">{returnComponent('merchants')}</Route>
          <Route path="/:id">{returnComponent('seller')}</Route>
          <Route path="/:id#story">{returnComponent('seller')}</Route> */}
          <Route>{returnComponent('error')}</Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
