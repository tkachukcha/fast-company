import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const badgeClass = "badge m-1 bg-";

  const renderQualities = (user) => {
    return user.qualities.map((quality, id) => (
      <span key={id} className={badgeClass + quality.color}>{quality.name}</span>
    ));
  };

  const handleUserDelete = (userIndex) => {
    setUsers((prevState) =>
      prevState.filter((user) => user !== users[userIndex])
    );
  };

  const renderTotalUsers = (usersNum) => {
    let peopleEndingStr = '';
    let tusaEndingStr = 'ёт';

    if ((usersNum < 11 || usersNum > 14 ) && (usersNum%10 > 1 && usersNum%10 < 5)) {
      peopleEndingStr = 'а';
      tusaEndingStr = 'ут';
    }
    if (usersNum === 0) {
      return;
    }
    return (
      <h2>
        <span className='badge m-2 bg-primary'>
          {usersNum} человек{peopleEndingStr} тусан{tusaEndingStr} с тобой сегодня
        </span>
      </h2>
    )
  };

  const renderTable = (usersNum) => {
    if (usersNum === 0) {
      return (<h2>
      <span className='badge m-2 bg-danger'>Никто не тусанёт с тобой сегодня</span>
    </h2>);
    } else {
      return (
        <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, ind) => (
            <tr key={ind}>
              <td>{user.name}</td>
              <td>{renderQualities(user)}</td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}/5</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleUserDelete(ind)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      );
    }
  }

  return (
    <>
      {renderTotalUsers(users.length)}
      {renderTable(users.length)}
    </>
  );
};

export default Users;
