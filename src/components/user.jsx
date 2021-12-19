import React from "react";
import Qualities from "./qualities";
import Bookmark from "./bookmark";

const User = (props) => {
  const {
    _id,
    name,
    profession,
    qualities,
    completedMeetings,
    rate,
    bookmark,
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
        <Bookmark 
          id={_id} 
          bookmark={bookmark}
          onBookmark={props.onBookmark} 
        />
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

export default User;
