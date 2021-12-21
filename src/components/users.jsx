import React, { useState } from 'react';
import User from './user';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';

const Users = (props) => {
  const { users } = props;
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const userCrop = paginate(users, currentPage, pageSize);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="w-25 p-3">
              Имя
            </th>
            <th scope="col" className="w-25 p-3">
              Качества
            </th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {userCrop.map((user) => (
            <User
              key={user._id}
              onDelete={props.onDelete}
              onBookmark={props.onBookmark}
              {...user}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Users;
