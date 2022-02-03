import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar';
import api from '../../api';

const Comment = ({ id, content, userId, createdAt, users, onDelete }) => {
  const getUserNameById = (id) => {
    const index = users.findIndex((object) => {
      return object._id === id;
    });
    return users[index].name;
  };

  const countTimeSinceComment = (createdAt) => {
    const now = new Date();
    const createTime = new Date(createdAt);
    const elapsed = now.getTime() - createTime.getTime();
    let createdMinutes = createTime.getMinutes();
    createdMinutes =
      createdMinutes < 10 ? `0${createdMinutes}` : createdMinutes;
    let message;
    const months = [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря'
    ];
    if (elapsed < 60000) {
      message = '1 минуту назад';
    } else if (elapsed >= 60000 && elapsed < 300000) {
      message = '5 минут назад';
    } else if (elapsed >= 300000 && elapsed < 600000) {
      message = '10 минут назад';
    } else if (elapsed >= 600000 && elapsed < 1800000) {
      message = '30 минут назад';
    } else if (elapsed >= 1800000 && elapsed < 86400000) {
      message = `${createTime.getHours()}:${createdMinutes}`;
    } else if (elapsed >= 86400000 && elapsed < 31540000000) {
      message = `${createTime.getDate()} ${months[createTime.getMonth()]}`;
    } else if (elapsed >= 31540000000) {
      message = `${createTime.getDate()} ${
        months[createTime.getMonth()]
      } ${createTime.getFullYear()} года`;
    }
    return message;
  };

  const handleDelete = () => {
    api.comments.remove(id);
    onDelete();
  };

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <Avatar
              source={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
              )
                .toString(36)
                .substring(7)}.svg`}
              size="65"
              classes="shadow-1-strong me-3"
            />

            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    {getUserNameById(userId)}
                    <span className="small m-2 d-inline-block">
                      {countTimeSinceComment(+createdAt)}
                    </span>
                  </p>
                  <button
                    className="btn btn-sm text-primary d-flex align-items-center"
                    onClick={handleDelete}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
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
