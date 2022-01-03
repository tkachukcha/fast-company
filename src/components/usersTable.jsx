import React from 'react';
import User from './user';
import PropTypes from 'prop-types';

const UsersTable = ({
  userCrop,
  onSort,
  onDelete,
  onBookmark,
  currentSort
}) => {
  const handleSort = (item) => {
    if (item === currentSort.iter) {
      onSort({
        ...currentSort,
        order: currentSort.order === 'asc' ? 'desc' : 'asc'
      });
    } else {
      onSort({ iter: item, order: 'asc' });
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th
            onClick={() => handleSort('name')}
            scope="col"
            className="w-25 p-3"
            role="button"
          >
            Имя
          </th>
          <th scope="col" className="w-25 p-3" >
            Качества
          </th>
          <th
            onClick={() => handleSort('profession.name')}
            scope="col"
            role="button"
            className="p-3"
          >
            Профессия
          </th>
          <th
            onClick={() => handleSort('completedMeetings')}
            scope="col"
            role="button"
            className="p-3"
          >
            Встретился, раз
          </th>
          <th
            onClick={() => handleSort('rate')}
            scope="col"
            role="button"
            className="p-3"
          >
            Оценка
          </th>
          <th
            onClick={() => handleSort('bookmark')}
            scope="col"
            role="button"
            className="p-3"
          >
            Избранное
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {userCrop.map((user) => (
          <User
            key={user._id}
            onDelete={onDelete}
            onBookmark={onBookmark}
            {...user}
          />
        ))}
      </tbody>
    </table>
  );
};
UsersTable.propTypes = {
  userCrop: PropTypes.array.isRequired,
  currentSort: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
};

export default UsersTable;
