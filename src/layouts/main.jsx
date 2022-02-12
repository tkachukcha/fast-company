import React from 'react';
import useMockData from '../utils/mockData';

const Main = () => {
  const { error, init, progress, status } = useMockData();
  const handleInit = () => {
    init();
  };
  return (
    <div className="container mt-3">
      <h1>Main</h1>
      <h3>Инициализация данных в FireBase</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleInit}>
        Инициализировать
      </button>
    </div>
  );
};

export default Main;
