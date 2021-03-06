import React from 'react';
import PropTypes from 'prop-types';
import Card from '../common/card';
import Avatar from '../common/avatar';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProfessionById } from '../../store/professions';
import { getCurrentUserId } from '../../store/users';

const UserCard = ({ user }) => {
  const currentUserId = useSelector(getCurrentUserId());
  const profession = useSelector(getProfessionById(user.profession));
  const history = useHistory();
  const handleEdit = () => {
    history.push(`${history.location.pathname}/edit`);
  };
  return (
    <Card>
      {currentUserId === user._id && (
        <button
          className="position-absolute top-0 end-0 btn  btn-light btn-sm"
          onClick={handleEdit}
        >
          <i className="bi bi-gear"></i>
        </button>
      )}

      <div className="d-flex flex-column align-items-center text-center position-relative ">
        <Avatar source={user.image} size="150" />
        <div className="mt-3">
          <h4>{user.name}</h4>
          <p className="text-secondary mb-1">Профессия: {profession?.name}</p>
          <div className="text-muted">
            <i
              className="bi bi-caret-down-fill text-primary "
              role="button"
            ></i>
            <i className="bi bi-caret-up text-secondary" role="button"></i>
            <span className="ms-2">{user.rate}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  professionName: PropTypes.string,
  rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onEdit: PropTypes.func
};

export default UserCard;
