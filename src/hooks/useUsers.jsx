import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import usersService from '../services/users.service';
import { toast } from 'react-toastify';

const UsersContext = React.createContext();

export const useUsers = () => {
  return useContext(UsersContext);
};

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isUpdated, setUpdated] = useState(false);
  const [errors, setErrors] = useState(null);

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

  async function updateUser(data) {
    try {
      const { content } = await usersService.updateUser(data);
      getUsers();
      toast.success('Юзер обновлён');
    } catch (error) {
      errorCatcher(error);
    }
  }

  return (
    <UsersContext.Provider value={{ users, getUserById, updateUser }}>
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
