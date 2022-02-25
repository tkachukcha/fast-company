import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import usersService from '../services/users.service';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth';

const UsersContext = React.createContext();

export const useUsers = () => {
  return useContext(UsersContext);
};

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const { currentUser } = useAuth();

  const getUsers = async () => {
    try {
      const { content } = await usersService.fetchAll();
      setUsers(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const newUsers = [...users];
      const ind = newUsers.findIndex((u) => u._id === currentUser._id);
      newUsers[ind] = currentUser;
      setUsers(newUsers);
    }
  }, [currentUser]);

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

  function getUserById(userId) {
    return users.find((user) => user._id === userId);
  }

  return (
    <UsersContext.Provider value={{ users, getUserById }}>
      {!isLoading ? children : <h1>Loading...</h1>}
    </UsersContext.Provider>
  );
};
UsersProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default UsersProvider;
