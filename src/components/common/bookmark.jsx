import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = (props) => {
  const { id, bookmark } = props;
  let bookmarkIcon = 'bi bi-bookmark';
  if (bookmark) {
    bookmarkIcon = 'bi bi-bookmark-fill';
  }
  return (
    <button onClick={() => props.onBookmark(id)}>
      <i className={bookmarkIcon}></i>
    </button>
  );
};
Bookmark.propTypes = {
  id: PropTypes.string.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onBookmark: PropTypes.func.isRequired
};

export default Bookmark;
