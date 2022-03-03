import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar';
import countTimeSinceComment from '../../utils/timeSinceComment';
import { useSelector } from 'react-redux';
import { getUserById, getCurrentUserId } from '../../store/users';

const Comment = ({ id, content, userId, createdAt, onDelete }) => {
  const currentUserId = useSelector(getCurrentUserId());
  const user = useSelector(getUserById(userId));
  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <Avatar
              source={user.image}
              size="65"
              classes="shadow-1-strong me-3"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    {user && user.name}
                    <span className="small m-2 d-inline-block">
                      {countTimeSinceComment(+createdAt)}
                    </span>
                  </p>
                  {currentUserId === userId && (
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => onDelete(id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Comment.propTypes = {
  id: PropTypes.string,
  content: PropTypes.string,
  userId: PropTypes.string,
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  users: PropTypes.array,
  onDelete: PropTypes.func
};

export default Comment;
