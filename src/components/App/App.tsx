import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';
import React, { lazy, Suspense, useState } from 'react';
import ReactGA from 'react-ga';
import Loader from '../Loader';
import Header from '../Header';
import Footer from '../Footer';

const trackingId = process.env.REACT_APP_GA_TRACKING_ID!;
ReactGA.initialize(trackingId);

const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

// we could use template strings, but just to be safe we'll hardcode the
// lazy imports
const SellerPage = lazy(() => import('../SellerPage'));
const MerchantsPage = lazy(() => import('../MerchantsPage'));
const ErrorPage = lazy(() => import('../404Page'));

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const returnComponent = (child) => {
    let component;
    switch (child) {
      case 'merchants':
        component = <MerchantsPage menuOpen={menuOpen} />;
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
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {component}
        <Footer menuOpen={menuOpen} />
      </>
    );
  };

  return (
    <Router history={history}>
      <Suspense fallback={<Loader isPage={true} />}>
        <Switch>
          <Route path="/merchants">{returnComponent('merchants')}</Route>
          <Route path="/:id">{returnComponent('seller')}</Route>
          <Route path="/:id#story">{returnComponent('seller')}</Route>
          <Route>{returnComponent('error')}</Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
