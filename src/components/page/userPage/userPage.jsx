import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import Qualities from '../../ui/qualities';
import { useHistory, useParams } from 'react-router-dom';
import UserEdit from '../userEdit';

const UserPage = ({ id }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  const [qualities, setQualities] = useState();
  const [professions, setProfession] = useState();

  useEffect(() => {
    api.users.getById(id).then((data) => {
      setUser(data);
    });
    api.professions.fetchAll().then((data) => {
      setProfession(data);
    });
    api.qualities.fetchAll().then((data) => {
      setQualities(data);
    });
  }, []);

  const params = useParams();
  const edit = params.edit;

  const handleGoBack = () => {
    history.push(`/users/${id}/edit`);
  };

  const renderUserPage = (user, edit) => {
    if (edit) {
      return (
        <UserEdit user={user} professions={professions} qualities={qualities} />
      );
    } else {
      return (
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
          <button className="m-3 px-3 py-1" onClick={handleGoBack}>
            Редактировать
          </button>
        </>
      );
    }
  };

  return (
    <>
      {user ? renderUserPage(user, edit) : <h1 className="p-3">Загрузка...</h1>}
    </>
  );
};
UserPage.propTypes = {
  id: PropTypes.string
};

export default UserPage;
