import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getProfessionById } from '../../store/professions';

const Professions = ({ id }) => {
  const profession = useSelector(getProfessionById(id));
  return <>{<span>{profession?.name}</span>}</>;
};
Professions.propTypes = {
  id: PropTypes.string
};

export default Professions;
