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
const AboutPage = lazy(() => import('../About'));
const MerchantsPage = lazy(() => import('../MerchantsPage'));
const ErrorPage = lazy(() => import('../404Page'));

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router history={history}>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Suspense fallback={<Loader isPage={true} />}>
        <Switch>
          <Route path="/about">
            {' '}
            <AboutPage />{' '}
          </Route>
          <Route path="/merchants">
            {' '}
            <MerchantsPage />
          </Route>
          <Route path="/:id">
            <SellerPage menuOpen={menuOpen} />
          </Route>
          <Route path="/:id#story">
            <SellerPage menuOpen={menuOpen} />
          </Route>
          <Route>
            <ErrorPage menuOpen={menuOpen} />
          </Route>
        </Switch>
      </Suspense>
      <Footer menuOpen={menuOpen} />
    </Router>
  );
};

export default App;
