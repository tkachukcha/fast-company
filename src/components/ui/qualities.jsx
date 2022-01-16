import React from 'react';
import PropTypes from 'prop-types';

const Qualities = (props) => {
  const { qualities } = props;
  const badgeClass = 'badge m-1 bg-';
  return qualities.map((quality, id) => (
    <span key={id} className={badgeClass + quality.color}>
      {quality.name}
    </span>
  ));
};
Qualities.propTypes = {
  qualities: PropTypes.array.isRequired
};
export default Qualities;
