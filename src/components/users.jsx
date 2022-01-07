/* eslint-disable multiline-ternary */

import React, { useState, useEffect } from 'react';
import api from '../api';
import Pagination from './pagination';
import GroupList from './groupList';
import { paginate } from '../utils/paginate';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';
import _ from 'lodash';

const Users = () => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
    api.professions.fetchAll().then((data) => {
      setProfession(data);
    });
  }, []);

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

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const filteredUsers =
    users && selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : users;
  const count = filteredUsers ? filteredUsers.length : undefined;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  return (
    <>
      {users ? (
        <div className="d-flex">
          {professions && (
            <div className="d-flex flex-column flex-shrink-0 p-3">
              <GroupList
                items={professions}
                onItemSelect={handleProfessionSelect}
                selectedItem={selectedProf}
              />
              <button className="btn btn-secondary m-2" onClick={clearFilter}>
                Очистить
              </button>
            </div>
          )}
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <SearchStatus usersNum={count} />
            <UsersTable
              userCrop={userCrop}
              selectedSort={sortBy}
              onDelete={handleUserDelete}
              onBookmark={handleUserBookmarked}
              onSort={handleSort}
            />
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-25 mx-auto my-2 text-center">Загрузка...</div>
      )}
    </>
  );
};

export default Users;
