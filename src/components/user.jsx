import React from 'react';
import Qualities from './qualities';
import Bookmark from './bookmark';
import PropTypes from 'prop-types';

const User = (props) => {
  const {
    _id,
    name,
    profession,
    qualities,
    completedMeetings,
    rate,
    bookmark
  } = props;
  return (
    <tr>
      <td>{name}</td>
      <td>
        <Qualities qualities={qualities} />
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <Bookmark id={_id} bookmark={bookmark} onBookmark={props.onBookmark} />
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => props.onDelete(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profession: PropTypes.object.isRequired,
  qualities: PropTypes.array.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default User;
