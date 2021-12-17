import React from 'react';
import Qualities from './qualities';
import Bookmark from './bookmark';

const User = (props) => {
  const {id, name, profession, qualities,completedMeetings, rate, bookmark} = props;
  return (
      <tr>
        <td>{name}</td>
        <td><Qualities qualities={qualities}/></td>
        <td>{profession.name}</td>
        <td>{completedMeetings}</td>
        <td>{rate}/5</td>
        <td><Bookmark bookmark={bookmark}/></td>
        <td>
          <button
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    );
};

export default User;