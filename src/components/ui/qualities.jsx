import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../../hooks/useQualities';

const Qualities = ({ qualities }) => {
  const { qualitiesList } = useQualities();
  const badgeClass = 'badge m-1 bg-';
  const newQualities = qualities.map((id) =>
    qualitiesList.find((q) => q._id === id)
  );
  return newQualities.map((quality) => (
    <span key={quality._id} className={badgeClass + quality.color}>
      {quality.name}
    </span>
  ));
};
Qualities.propTypes = {
  qualities: PropTypes.array.isRequired
};
export default Qualities;
