import React, { useEffect, useState, useContext } from 'react';

import PropTypes from 'prop-types';
import qualitiesService from '../services/qualities.service';
import { toast } from 'react-toastify';

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};

const QualitiesProvider = ({ children }) => {
  const [qualitiesList, setQualitiesList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const getQualitiesList = async () => {
    try {
      const { content } = await qualitiesService.fetchAll();
      setQualitiesList(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  useEffect(() => {
    getQualitiesList();
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
    <QualitiesContext.Provider value={{ qualitiesList }}>
      {!isLoading ? children : <h1>Loading...</h1>}
    </QualitiesContext.Provider>
  );
};
QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default QualitiesProvider;
