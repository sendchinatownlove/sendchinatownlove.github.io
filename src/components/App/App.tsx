import SellerPage from '../SellerPage';
import About from '../About';
import MerchantsPage from '../MerchantsPage';
import ErrorPage from '../404Page';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import ReactGA from 'react-ga';

const trackingId = process.env.REACT_APP_GA_TRACKING_ID!;
ReactGA.initialize(trackingId);

const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

class App extends React.Component<{}> {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {
            // TODO(ArtyEmsee): add router config for this route
          }
          <Route path="/about" component={About} />
          <Route path="/sellers" component={MerchantsPage} />
          <Route path="/:id" component={SellerPage} />
          <Route path="/:id#story" component={SellerPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
