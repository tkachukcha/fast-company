import React from 'react';
import { useProfessions } from '../../hooks/useProfessions';
import PropTypes from 'prop-types';

const Professions = ({ id }) => {
  const { getProfession, isLoading } = useProfessions();
  return <>{!isLoading && <span>{getProfession(id).name}</span>}</>;
};
Professions.propTypes = {
  id: PropTypes.string
};

export default Professions;
