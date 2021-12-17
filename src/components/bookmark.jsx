import React from 'react';

const Bookmark = (props) => {
  const {isBookmarked} = props;
  return (<button>{isBookmarked ? 'true' : 'false'}</button>);
}

export default Bookmark;