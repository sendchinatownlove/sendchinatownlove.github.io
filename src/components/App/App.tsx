import React, { useState, useCallback } from 'react';
import Home from '../Home';
import MerchantPage from '../MerchantPage';
import About from '../About';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';

const history = createBrowserHistory();

class App extends React.Component<{}> {
  // add util method to fetch api data

  // Leaving this as `any` type until we have some use case for typing it
  constructor(props: any) {
    super(props)
    this.state = {
      vendors: [],
      vendorsLoading: false
    }
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/story/:name" component={MerchantPage} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    );
  }
}

export default App;
