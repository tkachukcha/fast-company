import React from "react";

const Bookmark = (props) => {
  const { id, bookmark } = props;
  let bookmarkIcon = "bi bi-bookmark";
  if (bookmark) {
    bookmarkIcon = "bi bi-bookmark-fill";
  }
  return (
    <button onClick={() => props.onBookmark(id)}>
      <i className={bookmarkIcon}></i>
    </button>
  );
};

export default Bookmark;
