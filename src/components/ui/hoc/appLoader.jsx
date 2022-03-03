import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUsersLoadingStatus,
  loadUsersList,
  getIsLoggedIn
} from '../../../store/users';
import { loadProfessionsList } from '../../../store/professions';
import { loadQualitiesList } from '../../../store/qualities';
import PropTypes from 'prop-types';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());
  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
    if (isLoggedIn) {
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);
  if (usersStatusLoading) return 'Loading';
  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
