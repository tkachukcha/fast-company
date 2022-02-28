import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getQualities, loadQualitiesList } from '../../store/qualities';
import { useSelector, useDispatch } from 'react-redux';

const Qualities = ({ qualities }) => {
  const qualitiesList = useSelector(getQualities());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

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
