/* eslint-disable multiline-ternary */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import Qualities from './qualities';
import { Link } from 'react-router-dom';

const UserPage = ({ id }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(id).then((data) => {
      setUser(data);
    });
  }, []);

  return (
    <>
      {user ? (
        <>
          <h1 className="p-3">{user.name}</h1>
          <h2 className="px-3 py-1">Профессия: {user.profession.name}</h2>
          <div className="px-3 py-2">
            <Qualities qualities={user.qualities} />
          </div>
          <h3 className="px-3 py-1">
            Встретился, раз: {user.completedMeetings}
          </h3>
          <h3 className="px-3 py-1">Оценка: {user.rate}</h3>
          <button className="m-3 px-3 py-1">
            <Link className="text-decoration-none link-dark" to="/users">
              Все пользователи
            </Link>
          </button>
        </>
      ) : (
        <h1 className="p-3">Загрузка...</h1>
      )}
    </>
  );
};
UserPage.propTypes = {
  id: PropTypes.string
};

export default UserPage;
