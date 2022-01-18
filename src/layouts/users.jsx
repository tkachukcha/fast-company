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

const Users = () => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [users, setUsers] = useState();
  const [searchStr, setSearchStr] = useState('');

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

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setSearchStr('');
    setSelectedProf(item);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  let filteredUsers;
  if (users) {
    if (selectedProf) {
      filteredUsers = users.filter(
        (user) => user.profession._id === selectedProf._id
      );
    } else {
      if (searchStr !== '') {
        const searchRegExp = new RegExp(searchStr, 'i');
        filteredUsers = users.filter((user) => searchRegExp.test(user.name));
      } else {
        filteredUsers = users;
      }
    }
  }

  const count = filteredUsers ? filteredUsers.length : undefined;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
    setSearchStr('');
  };

  const handleSearch = ({ target }) => {
    setSelectedProf();
    setSearchStr(target.value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const renderUsers = () => {
    if (users) {
      if (userId) {
        if (!users.every((user) => user._id !== userId)) {
          return <UserPage id={userId} />;
        } else {
          return <h1 className="p-3">User is not found</h1>;
        }
      } else {
        return (
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
            <div
              className="d-flex flex-column flex-shrink-0 p-3 w-75"
              style={{ height: 600 }}
            >
              <SearchStatus usersNum={count} />
              <SearchForm onChange={handleSearch} searchStr={searchStr} />
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
        );
      }
    } else {
      return <h1 className="p-3">Загрузка...</h1>;
    }
  };

  return renderUsers();
};

export default Users;
