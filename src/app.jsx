import React from 'react';
import Users from './layouts/users';
import NavBar from './components/ui/navBar';
import { Route, Switch } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';
import UserEdit from './components/page/userEdit';

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/users/:userID?/:edit?" component={Users} />
      </Switch>
    </>
  );
};

export default App;
