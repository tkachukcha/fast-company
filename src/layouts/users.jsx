import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import UserPage from '../components/page/userPage';
import _ from 'lodash';
import UsersListPage from '../components/page/usersListPage';

const Users = () => {
  const [users, setUsers] = useState();
  const [professions, setProfession] = useState();
  const [qualities, setQualities] = useState();
  const params = useParams();
  const userId = params.userID;

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
    api.professions.fetchAll().then((data) => {
      setProfession(data);
    });
    api.qualities.fetchAll().then((data) => {
      setQualities(data);
    });
  }, []);

  return (
    <>
      {users && userId ? (
        !users.every((user) => user._id !== userId) ? (
          <UserPage
            id={userId}
            professions={professions}
            qualities={qualities}
          />
        ) : (
          <h1>User not found</h1>
        )
      ) : (
        <UsersListPage professions={professions} />
      )}
    </>
  );
};

export default Users;
