import React from 'react';
import MerchantPage from '../MerchantPage';
import Footer from '../Footer';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Redirect exact from="/" to="/story" />
      <Switch>
        <Route component={MerchantPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
