import React from 'react';
import Home from '../Home';
import MerchantPage from '../MerchantPage';
import About from '../About';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/story" component={MerchantPage} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}

export default App;
