import React, { useState } from 'react';
import Users from './components/users';
import api from './api';

const App = () => {
  const initialUsers = api.users.fetchAll();
  const [users, setUsers] = useState(initialUsers);

  const handleUserDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => id !== user._id));
  };

  const handleUserBookmarked = (id) => {
    const newUsers = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return { ...user };
    });
    setUsers(newUsers);
  };

  const renderTable = (usersNum) => {
    if (usersNum !== 0) {
      return (
        <Users
          users={users}
          onDelete={handleUserDelete}
          onBookmark={handleUserBookmarked}
        />
      );
    } else {
      return;
    }
  };

  return (
    <>
      {renderTable(users.length)}
    </>
  );
};

export default App;
