import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UserEditPage from '../components/page/userEditPage';
import UsersListPage from '../components/page/usersListPage';
import UsersProvider from '../hooks/useUsers';
import { useAuth } from '../hooks/useAuth';

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const { currentUser } = useAuth();
  return (
    <>
      <UsersProvider>
        {userId ? (
          edit ? (
            userId === currentUser._id ? (
              <UserEditPage id={userId} />
            ) : (
              <Redirect to={`/users/${currentUser._id}/edit`} />
            )
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
