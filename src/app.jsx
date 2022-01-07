import React from 'react';
import Users from './components/users';

const App = () => {
  // const [users, setUsers] = useState();

  // useEffect(() => {
  //   api.users.fetchAll().then((data) => {
  //     setUsers(data);
  //   });
  // }, []);

  // const handleUserDelete = (id) => {
  //   setUsers((prevState) => prevState.filter((user) => id !== user._id));
  // };

  // const handleUserBookmarked = (id) => {
  //   const newUsers = users.map((user) => {
  //     if (user._id === id) {
  //       user.bookmark = !user.bookmark;
  //     }
  //     return { ...user };
  //   });
  //   setUsers(newUsers);
  // };

  // const renderTable = (usersNum) => {
  //   if (usersNum !== 0) {
  //     return (
  //       <Users
  //         users={users}
  //         onDelete={handleUserDelete}
  //         onBookmark={handleUserBookmarked}
  //       />
  //     );
  //   } else {
  //     return;
  //   }
  // };

  // return <>{users && (renderTable(users.length))}</>;
  return <Users />;
};

export default App;
