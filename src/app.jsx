import React from 'react';
import Users from './layouts/users';
import NavBar from './components/ui/navBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProfessionsProvider from './hooks/useProfessions';
import QualitiesProvider from './hooks/useQualities';
import AuthProvider from './hooks/useAuth';

const App = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <ProfessionsProvider>
          <QualitiesProvider>
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/users/:userID?/:edit?" component={Users} />
              <Redirect to="/" />
            </Switch>
            <ToastContainer />
          </QualitiesProvider>
        </ProfessionsProvider>
      </AuthProvider>
    </>
  );
};

export default App;
