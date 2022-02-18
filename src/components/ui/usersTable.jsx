/* eslint-disable multiline-ternary */

import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Table, { TableHeader, TableBody } from '../common/table';
import Bookmark from '../common/bookmark';
import Qualities from './qualities';
import Professions from './professions';

const UsersTable = ({ userCrop, onSort, onBookmark, selectedSort }) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      path: 'qualities',
      name: 'Качества',
      component: (user) => <Qualities qualities={user.qualities} />
    },
    professions: {
      component: (user) => <Professions id={user.profession} />,
      name: 'Профессия'
    },
    completedMeetings: {
      path: 'completedMeetings',
      name: 'Встретился, раз'
    },
    rate: {
      path: 'rate',
      name: 'Оценка'
    },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark
          id={user._id}
          bookmark={user.bookmark}
          onBookmark={onBookmark}
        />
      )
    }
  };

  return (
    <Table>
      <TableHeader
        columns={columns}
        selectedSort={selectedSort}
        onSort={onSort}
      />
      <TableBody {...{ columns, data: userCrop }} />
    </Table>
  );
};

UsersTable.propTypes = {
  userCrop: PropTypes.array.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
};

export default UsersTable;
