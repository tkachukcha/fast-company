import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import usersService from '../services/users.service';
import { toast } from 'react-toastify';
import localStorageService, {
  setTokens
} from '../services/localStorage.service';
import { useHistory } from 'react-router-dom';

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState();
  const [errors, setErrors] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isUpdated, setUpdated] = useState(true);
  const history = useHistory();
  const errorCatcher = (error) => {
    const { message } = error.response.data.error;
    setErrors(error);
  };

  async function getUserData() {
    try {
      const { content } = await usersService.getCurrentUser();
      setUser(content);
      console.log(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (errors !== null) {
      toast.error(errors);
      setErrors(null);
    }
  }, [errors]);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post('accounts:signUp', {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(0, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      });
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
    try {
      const { data } = await httpAuth.post('accounts:signInWithPassword', {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      toast.success(`Welcome back`);
      await getUserData();
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

  function logOut() {
    localStorageService.removeAuthData();
    setUser(null);
    history.push('/');
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
      const { content } = await usersService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function updateCurrentUser() {}

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, updateCurrentUser, currentUser, logOut }}
    >
      {!isLoading ? children : <h1>Loading...</h1>}
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
