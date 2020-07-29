import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './App.css';

import Signin from './components/Signin';
import Secured from './components/Secured';

const App = () => {
  return (
    <Router>
      <Route
        exact
        path='/'
        render={props => <Signin {...props} />}
      />
      <Route
        path='/secured'
        render={props => <Secured {...props} />}
      />
    </Router >
  );
}

export default App;
