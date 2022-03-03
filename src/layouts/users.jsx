import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UserEditPage from '../components/page/userEditPage';
import UsersListPage from '../components/page/usersListPage';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/users';
import UsersLoader from '../components/ui/hoc/usersLoader';

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <UsersLoader>
      {userId ? (
        edit ? (
          userId === currentUserId ? (
            <UserEditPage id={userId} />
          ) : (
            <Redirect to={`/users/${currentUserId}/edit`} />
          )
        ) : (
          <UserPage id={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </UsersLoader>
  );
};

export default Users;
