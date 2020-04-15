import Home from '../Home';
import SellerPage from '../SellerPage';
import About from '../About';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import ReactGA from 'react-ga';

const trackingId =  process.env.REACT_APP_API_ENDPOINT!;
ReactGA.initialize(trackingId);

const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

class App extends React.Component<{}> {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          {
            // TO DO: add router config for this route
          }
          <Route path="/:id" component={SellerPage} />
          <Route path="/:id#story" component={SellerPage} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    );
  }
}

export default App;
