import React from 'react';
import Users from './layouts/users';
import NavBar from './components/ui/navBar';
import { Route, Switch } from 'react-router-dom';
import Main from './layouts/main';
import Login from './layouts/login';
import { ToastContainer } from 'react-toastify';
import ProfessionsProvider from './hooks/useProfessions';
import QualitiesProvider from './hooks/useQualities';

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <ProfessionsProvider>
          <QualitiesProvider>
            <Route path="/login/:type?" component={Login} />
            <Route path="/users/:userID?/:edit?" component={Users} />
          </QualitiesProvider>
        </ProfessionsProvider>
      </Switch>
      <ToastContainer />
    </>
  );
};

export default App;
