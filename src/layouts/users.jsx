import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UserEditPage from '../components/page/userEditPage';
import UsersListPage from '../components/page/usersListPage';
import UsersProvider from '../hooks/useUsers';

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

  return (
    <>
      <UsersProvider>
        {userId ? (
          edit ? (
            <UserEditPage id={userId} />
          ) : (
            <UserPage id={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersProvider>
    </>
  );
};

export default Users;
