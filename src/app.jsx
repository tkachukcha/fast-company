import React from 'react';
import Users from './layouts/users';
import NavBar from './components/navBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userID?" component={Users} />
      </Switch>
    </>
  );
};

export default App;
