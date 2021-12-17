import React from "react";
import User from './user';

const Users = (props) => {
  const {users} = props;
  console.log(props);
  // const [users, setUsers] = useState(api.users.fetchAll());
  // const badgeClass = "badge m-1 bg-";

  // const handleUserDelete = (userIndex) => {
  //   setUsers((prevState) =>
  //     prevState.filter((user) => user !== users[userIndex])
  //   );
  // };

  // const renderTotalUsers = (usersNum) => {
  //   let peopleEndingStr = "";
  //   let tusaEndingStr = "ёт";

  //   if (
  //     (usersNum < 11 || usersNum > 14) &&
  //     usersNum % 10 > 1 &&
  //     usersNum % 10 < 5
  //   ) {
  //     peopleEndingStr = "а";
  //     tusaEndingStr = "ут";
  //   }
  //   if (usersNum === 0) {
  //     return (
  //       <h2>
  //         <span className="badge m-2 bg-danger">
  //           Никто не тусанёт с тобой сегодня
  //         </span>
  //       </h2>
  //     );
  //   } else {
  //     return (
  //       <h2>
  //         <span className="badge m-2 bg-primary">
  //           {usersNum} человек{peopleEndingStr} тусан{tusaEndingStr} с тобой
  //           сегодня
  //         </span>
  //       </h2>
  //     );
  //   }
  // };

  // const renderTable = (usersNum) => {
  //   if (usersNum === 0) {
  //     return;
  //   } else {
  //     return (
  //       <table className="table">
  //         <thead>
  //           <tr>
  //             <th scope="col">Имя</th>
  //             <th scope="col">Качества</th>
  //             <th scope="col">Профессия</th>
  //             <th scope="col">Встретился, раз</th>
  //             <th scope="col">Оценка</th>
  //             <th scope="col">Избранное</th>
  //             <th scope="col"></th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {users.map(user => (
  //           <User 
  //             {...user}
  //           />))}
  //         </tbody>
  //       </table>
  //     );
  //   }
  // };

  return (
    <>
      <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
            <User 
            key={user.id}
              {...user}
            />))}
          </tbody>
        </table>
    </>
  );
};

export default Users;
