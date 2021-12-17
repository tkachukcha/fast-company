import React, { useState } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
  const initialUsers = api.users.fetchAll();
  const [users, setUsers] = useState(initialUsers);
  

  return <Users users={users} />;
};

export default App;
