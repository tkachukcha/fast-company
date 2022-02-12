import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import usersService from '../services/users.service';
import { toast } from 'react-toastify';
import { setTokens } from '../services/localStorage.service';

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  const [errors, setErrors] = useState(null);

  const errorCatcher = (error) => {
    const { message } = error.response.data.error;
    setErrors(error);
  };

  useEffect(() => {
    if (errors !== null) {
      toast.error(errors);
      setErrors(null);
    }
  }, [errors]);

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
      toast.success(`Successfully registered`);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const displayMessage = 'Пользователь с такой почтой уже существует';
          errorThrower('email', displayMessage);
        }
      }
    }
  }

  async function signIn({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      toast.success(`Welcome back`);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === 'EMAIL_NOT_FOUND') {
          const displayMessage = 'Учётной записи с таким адресом не существует';
          errorThrower('email', displayMessage);
        }
        if (message === 'INVALID_EMAIL') {
          const displayMessage = 'Неправильный адрес эл. почты';
          errorThrower('email', displayMessage);
        }
        if (message === 'INVALID_PASSWORD') {
          const displayMessage = 'Неправильный пароль';
          errorThrower('password', displayMessage);
        }
        if (message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
          const displayMessage = 'Слишком много попыток';
          errorThrower('password', displayMessage);
        }
      }
    }
  }

  function errorThrower(name, displayMessage) {
    toast.error(displayMessage);
    const errorObject = {
      [name]: displayMessage
    };
    throw errorObject;
  }

  async function createUser(data) {
    try {
      const { content } = usersService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default AuthProvider;
