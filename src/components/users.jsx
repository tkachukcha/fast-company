import React, { useState, useEffect } from 'react';
import api from '../api';
import Pagination from './pagination';
import GroupList from './groupList';
import { paginate } from '../utils/paginate';
import PropTypes from 'prop-types';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';
import _ from 'lodash';

const Users = (props) => {
  const { users, onDelete, onBookmark } = props;
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfession(data);
    });
  }, []);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession._id === selectedProf._id)
    : users;
  const count = filteredUsers.length;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  return (
    <>
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
            currentSort={sortBy}
            onDelete={onDelete}
            onBookmark={onBookmark}
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
    </>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired
};

export default Users;
