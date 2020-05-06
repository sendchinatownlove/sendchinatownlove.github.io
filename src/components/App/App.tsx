import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import ReactGA from 'react-ga';
import Loader from '../Loader';

const trackingId = process.env.REACT_APP_API_ENDPOINT!;
ReactGA.initialize(trackingId);

const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

// we could use template strings, but just to be safe we'll hardcode the
// lazy imports
const importPage = (component: String) => {
  switch (component) {
    case 'SellerPage':
      return lazy(() => import('../SellerPage'));
    case 'About':
      return lazy(() => import('../About'));
    case 'MerchantsPage':
      return lazy(() => import('../MerchantsPage'));
    default:
      return lazy(() => import('../404Page'));
  }
};

class App extends React.Component<{}> {
  render() {
    return (
      <Router history={history}>
        <Suspense fallback={<Loader isPage={true} />}>
          <Switch>
            {
              // TODO(ArtyEmsee): add router config for this route
            }
            <Route path="/about">{importPage('About')}</Route>
            <Route path="/sellers">{importPage('MerchantsPage')}</Route>
            <Route path="/:id">{importPage('SellerPage')}</Route>
            <Route path="/:id#story">{importPage('SellerPage')}</Route>
            <Route>{importPage('')}</Route>
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
