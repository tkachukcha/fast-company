import React from "react";
import api from "../api";

const User = () => {
  const users = api.users.fetchAll();
  return (<tr>
    <td>{users[0].name}</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>);
};

const Users = () => {
  console.log(api.users.fetchAll());
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
        <User />
        <User />
      </tbody>
    </table>
  );
};

export default Users;
