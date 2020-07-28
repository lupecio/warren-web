import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Transaction from '../pages/Transaction';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/bill" component={() => (<Transaction name="Pagamento" transaction_type={2} />)} />
    <Route path="/withdraw" component={() => (<Transaction name="Saque" transaction_type={3} />)} />
    <Route path="/deposit" component={() => (<Transaction name="Depósito" transaction_type={1} />)} />
  </Switch>
)

export default Routes;
