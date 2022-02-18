import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../../components/common/pagination';
import GroupList from '../../../components/common/groupList';
import { paginate } from '../../../utils/paginate';
import SearchStatus from '../../../components/ui/searchStatus';
import UsersTable from '../../../components/ui/usersTable';
import SearchForm from '../../../components/common/form/searchForm';
import _ from 'lodash';
import { useUsers } from '../../../hooks/useUsers';
import { useProfessions } from '../../../hooks/useProfessions';
import { useAuth } from '../../../hooks/useAuth';

const UsersListPage = ({ onBookmark, onDelete }) => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [searchStr, setSearchStr] = useState('');
  const { professions } = useProfessions();
  const { users } = useUsers();
  const { currentUser } = useAuth();

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

  function filterUsers(data) {
    let filteredUsers;
    if (data) {
      if (selectedProf) {
        filteredUsers = data.filter(
          (user) => user.profession === selectedProf._id
        );
      } else {
        if (searchStr !== '') {
          const searchRegExp = new RegExp(searchStr, 'i');
          filteredUsers = data.filter((user) => searchRegExp.test(user.name));
        } else {
          filteredUsers = data;
        }
      }
    }
    return filteredUsers.filter((u) => u._id !== currentUser._id);
  }
  const filteredUsers = filterUsers(users);
  const count = filteredUsers ? filteredUsers.length : undefined;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
    setSearchStr('');
  };

  const handleSearch = (value) => {
    setSelectedProf();
    setSearchStr(value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleUserBookmarked = (id) => {
    const newUsers = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return { ...user };
    });
    // setUsers(newUsers);
    console.log(newUsers);
  };

  return (
    <div className="d-flex">
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

      <div
        className="d-flex flex-column flex-shrink-0 p-3 w-75"
        style={{ height: 600 }}
      >
        <SearchStatus usersNum={count} />
        <SearchForm onChange={handleSearch} searchStr={searchStr} />
        <UsersTable
          userCrop={userCrop}
          selectedSort={sortBy}
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
};
UsersListPage.propTypes = {
  usersData: PropTypes.array,
  professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onBookmark: PropTypes.func,
  onDelete: PropTypes.func
};

export default UsersListPage;
