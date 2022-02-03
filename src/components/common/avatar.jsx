import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ source, classes, size }) => {
  const defaultClass = 'rounded-circle';
  return (
    <img
      src={source}
      className={`${defaultClass} ${classes}`}
      width={size}
      height={size}
    />
  );
};
Avatar.defaultProps = {
  classes: ''
};
Avatar.propTypes = {
  source: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  size: PropTypes.string
};

export default Avatar;
