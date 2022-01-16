import React from 'react';
import PropTypes from 'prop-types';

const SearchStatus = (props) => {
  const { usersNum } = props;

  const renderTotalUsers = (usersNum) => {
    let peopleEndingStr = '';
    let tusaEndingStr = 'ёт';

    if (
      (usersNum < 11 || usersNum > 14) &&
      usersNum % 10 > 1 &&
      usersNum % 10 < 5
    ) {
      peopleEndingStr = 'а';
      tusaEndingStr = 'ут';
    }
    if (usersNum === 0) {
      return (
        <span className="badge m-2 bg-danger">
          Никто не тусанёт с тобой сегодня
        </span>
      );
    } else {
      return (
        <span className="badge m-2 bg-primary">
          {usersNum} человек{peopleEndingStr} тусан{tusaEndingStr} с тобой
          сегодня
        </span>
      );
    }
  };

  return <h2>{renderTotalUsers(usersNum)}</h2>;
};
SearchStatus.propTypes = {
  usersNum: PropTypes.number.isRequired
};
export default SearchStatus;
