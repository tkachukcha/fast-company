import React, { useState, useContext, useEffect } from 'react';

import PropTypes from 'prop-types';
import professionsService from '../services/professions.service';
import { toast } from 'react-toastify';

const ProfessionsContext = React.createContext();

export const useProfessions = () => {
  return useContext(ProfessionsContext);
};

const ProfessionsProvider = ({ children }) => {
  const [professions, setProfessions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const getProfessionsList = async () => {
    try {
      const { content } = await professionsService.fetchAll();
      setProfessions(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
      setLoading(false);
    }
  };

  const getProfession = (id) => {
    return professions.find((p) => p._id === id);
  };

  useEffect(() => {
    getProfessionsList();
  }, []);

  useEffect(() => {
    if (errors !== null) {
      toast(errors);
      setErrors(null);
    }
  }, [errors]);

  const errorCatcher = (error) => {
    console.log(error);
    // const { message } = error.response.data;
    setErrors(error);
  };
  return (
    <ProfessionsContext.Provider
      value={{ isLoading, professions, getProfession }}
    >
      {children}
    </ProfessionsContext.Provider>
  );
};
ProfessionsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default ProfessionsProvider;
