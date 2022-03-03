import React from 'react';
import Users from './layouts/users';
import NavBar from './components/ui/navBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/common/protectedRoute';
import Logout from './layouts/logout';
import AppLoader from './components/ui/hoc/appLoader';

const App = () => {
  return (
    <AppLoader>
      <NavBar />
      <Switch>
        <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
        <Route path="/" exact component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
      <ToastContainer />
    </AppLoader>
  );
};

export default App;
