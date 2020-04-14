import React, { useState, useCallback } from 'react';
import Home from '../Home';
import MerchantPage from '../MerchantPage';
import About from '../About';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';
import { getSellers } from '../../utilities/api';

const history = createBrowserHistory();

class App extends React.Component<
  {},
  { sellers: []; sellersLoading: Boolean }
> {
  // TO DO: Leaving this as `any` type until we have some use case for typing it
  constructor(props: any) {
    super(props);
    this.state = {
      sellers: [],
      sellersLoading: false,
    };
  }

  componentDidMount() {
    const sellers: any = getSellers();

    console.log('App.tsx, componentWillMount: ', {
      sellers,
    });
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          {
            // TO DO: add router config for this route
          }
          <Route path="/story/:id" component={MerchantPage} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    );
  }
}

export default App;
