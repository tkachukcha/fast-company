import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, classes, bodyClasses }) => {
  const defaultClass = 'card';
  const defaultBodyClass = 'card-body';
  return (
    <div className={`${defaultClass} ${classes}`}>
      <div className={`${defaultBodyClass} ${bodyClasses}`}>{children}</div>
    </div>
  );
};
Card.defaultProps = {
  classes: 'mb-3',
  bodyClasses: ''
};

Card.propTypes = {
  classes: PropTypes.string,
  bodyClasses: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Card;
