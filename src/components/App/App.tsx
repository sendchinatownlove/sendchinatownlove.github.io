import { createBrowserHistory } from 'history';
import React, { lazy, Suspense, useState } from 'react';
import ReactPixel from 'react-facebook-pixel';
import ReactGA from 'react-ga';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { useMedia } from 'use-media';

import Footer from '../Footer';
import Loader from '../Loader';
import Header from '../Navbar';
import ScrollToTop from '../ScrollToTop';
import { Page } from '../../consts';
import ScreenName from '../../pages/PassportRedemption/ScreenName';
import { ModalPaymentProvider } from '../../utilities/hooks/ModalPaymentContext';
import { VoucherProvider } from '../../utilities/hooks/VoucherContext';

const trackingId = process.env.REACT_APP_GA_TRACKING_ID!;

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
const GiftAMealPage = lazy(() => import('../MerchantsPage/gam/GiftAMealPage'));
const LightUpChinatownPage = lazy(() =>
  import('../LightUpChinatown/LightUpChinatownPage')
);
const ErrorPage = lazy(() => import('../404Page'));
const VoucherRedemptionPage = lazy(() =>
  import('../../pages/VoucherRedemption')
);
const MerchantVoucherDashboard = lazy(() =>
  import('../../pages/MerchantVoucherDashboard')
);

const PassportVoucher = lazy(() =>
  import('../../pages/PassportRedemption/PassportVoucher')
);
const PassportRedemption = lazy(() => import('../../pages/PassportRedemption'));
const DetachedVoucherPrintouts = lazy(() =>
  import('../../pages/VoucherManagement/DetachedVoucherPrintout')
);

const options = {
  autoConfig: true, // set pixel's autoConfig
  debug: true, // enable logs
};
const pixelId = process.env.REACT_APP_FB_PIXEL_ID!;
ReactPixel.init(pixelId, undefined, options);

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const showAltLayout = useMedia({ minWidth: 900 });

  const returnComponent = (child: Page) => {
    let component;
    switch (child) {
      case Page.All:
        component = <MerchantsPage menuOpen={menuOpen} />;
        break;
      case Page.Merchants:
        component = <Redirect to="/all" />;
        break;
      case Page.Seller:
        component = (
          <SellerPage menuOpen={menuOpen} showAltLayout={showAltLayout} />
        );
        break;
      case Page.GiftAMeal:
        component = <GiftAMealPage menuOpen={menuOpen} />;
        break;
      case Page.LightUpChinatown:
        component = <LightUpChinatownPage />;
        break;
      case Page.Error:
      default:
        component = <ErrorPage menuOpen={menuOpen} />;
    }

    return (
      <ModalPaymentProvider>
        <ScrollToTop />
        <Header
          menuOpen={menuOpen}
          pageName={child}
          setMenuOpen={setMenuOpen}
        />
        {component}
        <Footer menuOpen={menuOpen} />
      </ModalPaymentProvider>
    );
  };

  return (
    <Router history={history}>
      <Suspense fallback={<Loader isPage={true} />}>
        <Switch>
          <Route path="/all">{returnComponent(Page.All)}</Route>
          <Route path="/voucher/:id">
            <VoucherProvider>
              <VoucherRedemptionPage />
            </VoucherProvider>
          </Route>
          <Route exact path="/passport">
            <PassportRedemption screen={ScreenName.Track} />
          </Route>
          <Route exact path="/passport/:id/tickets">
            <PassportRedemption screen={ScreenName.Dashboard} />
          </Route>
          <Route exact path="/passport/:id/redeem/:access_token">
            <PassportRedemption screen={ScreenName.Redemption} />
          </Route>
          <Route
            exact
            path="/passport/:id/redeem/:access_token/sponsor/:sponsor_seller_id"
          >
            <PassportRedemption screen={ScreenName.Claim} />
          </Route>
          <Route exact path="/:seller_id/dashboard/:secret_id">
            <MerchantVoucherDashboard />
          </Route>
          <Route path="/print-passport-voucher/:id/tickets/:tickets_secret">
            <PassportVoucher />
          </Route>
          <Route exact path="/passport/lyft_rewards/:contact_id/redeem/:token">
            <PassportRedemption screen={ScreenName.LyftCode} />
          </Route>
          <Route
            path="/gift-a-meal"
            component={() => {
              window.location.href = 'https://www.gofundme.com/f/gift-a-meal';
              return null;
            }}
          />
          <Route
            exact
            path="/distributor/:distributor_id/dashboard/print-detached"
          >
            <DetachedVoucherPrintouts />
          </Route>
          <Route path="/gift-a-meal-home">
            {returnComponent(Page.GiftAMeal)}
          </Route>
          <Route path="/light-up-chinatown">
            {returnComponent(Page.LightUpChinatown)}
          </Route>
          <Route path="/merchants">{returnComponent(Page.Merchants)}</Route>
          <Route path="/:id">{returnComponent(Page.Seller)}</Route>
          <Route path="/:id#story">{returnComponent(Page.Seller)}</Route>
          <Route>{returnComponent(Page.Error)}</Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
