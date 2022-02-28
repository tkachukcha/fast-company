import React, { useEffect } from 'react';
import Users from './layouts/users';
import NavBar from './components/ui/navBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProfessionsProvider from './hooks/useProfessions';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logOut';
import { loadQualitiesList } from './store/qualities';
import { loadProfessionsList } from './store/professions';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
  });
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Route path="/" exact component={Main} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Redirect to="/" />
        </Switch>
        <ToastContainer />
      </AuthProvider>
    </>
  );
};

export default App;
