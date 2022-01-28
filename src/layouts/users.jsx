/* eslint-disable multiline-ternary */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Pagination from '../components/common/pagination';
import GroupList from '../components/common/groupList';
import { paginate } from '../utils/paginate';
import SearchStatus from '../components/ui/searchStatus';
import UsersTable from '../components/ui/usersTable';
import UserPage from '../components/page/userPage';
import UserEdit from '../components/page/userEdit';
import SearchForm from '../components/common/form/searchForm';
import _ from 'lodash';
import UsersListPage from '../components/page/usersListPage';

const Users = () => {
  const [users, setUsers] = useState();
  const [professions, setProfession] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
    api.professions.fetchAll().then((data) => {
      setProfession(data);
    });
  }, []);

  const params = useParams();
  const userId = params.userID;

  const handleUserDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => id !== user._id));
  };

  const handleUserBookmarked = (id) => {
    const newUsers = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return { ...user };
    });
    setUsers(newUsers);
  };

  return (
    <>
      {users ? (
        userId ? (
          !users.every((user) => user._id !== userId) ? (
            <UserPage id={userId} />
          ) : (
            <h1 className="p-3">User is not found</h1>
          )
        ) : (
          <UsersListPage
            users={users}
            professions={professions}
            onBookmark={handleUserBookmarked}
            onDelete={handleUserDelete}
          />
        )
      ) : (
        <h1 className="p-3">Загрузка...</h1>
      )}
    </>
  );
};

export default Users;
