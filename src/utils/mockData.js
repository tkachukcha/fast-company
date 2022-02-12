import { useState, useEffect } from 'react';
import professions from '../mockdata/professions.json';
import qualities from '../mockdata/qualities.json';
import users from '../mockdata/users.json';
import httpService from '../services/http.service';

const useMockData = () => {
  const statusConst = {
    idle: 'Not started',
    pending: 'In process',
    success: 'Ready',
    error: 'Error occured'
  };
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConst.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const totalCount = professions.length + qualities.length + users.length;

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const updateProgress = () => {
    if (count !== 0 && status === statusConst.idle) {
      setStatus(statusConst.pending);
    }
    const newProgress = Math.floor((count / totalCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(statusConst.success);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function init() {
    try {
      for (const prof of professions) {
        await httpService.put('profession/' + prof._id, prof);
        incrementCount();
      }
      for (const q of qualities) {
        await httpService.put('quality/' + q._id, q);
        incrementCount();
      }
      for (const user of users) {
        await httpService.put('user/' + user._id, user);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConst.error);
    }
  }

  return { error, init, progress, status };
};

export default useMockData;
