import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/page/userPage';
import _ from 'lodash';
import UsersListPage from '../components/page/usersListPage';
import UsersProvider, { useUsers } from '../hooks/useUsers';
import QualitiesProvider from '../hooks/useQualities';

const Users = () => {
  const params = useParams();
  const userId = params.userID;

  return (
    <>
      <UsersProvider>
        {userId ? <UserPage id={userId} /> : <UsersListPage />}
      </UsersProvider>
    </>
  );
};

export default Users;
