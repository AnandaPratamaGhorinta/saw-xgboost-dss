import React, { useState } from "react";
import { Login } from "./login/login";

interface User {
  name: string;
  age?: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  let tableUserData: User[] = [];
  const tableUserDataRenderer: React.ReactNode[] = [];

  function handleAddUser() {
    const data: User = {
      name: (document.getElementById("name") as HTMLInputElement)?.value,
      age: (document.getElementById("age") as HTMLInputElement)?.value,
    };
    setUsers(tableUserData);
  }

  function handleDeleteUser() {
    tableUserData.pop();
    setUsers(tableUserData);
  }
  console.log(users);
  users.forEach((user) => {
    const data = (
      <tr>
        <td>{user.name}</td>
        <td>{user.age}</td>
      </tr>
    );
    tableUserDataRenderer.push(data);
  });

  return (
    <>
      <table border={100}>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
        {tableUserDataRenderer}
      </table>
      <p>
        name : <input type="text" id="name" />
      </p>
      <p>
        age :<input type="text" id="age" />
      </p>
      <p>
        <button id="delete" onClick={handleDeleteUser}>
          DELETE
        </button>
        <button id="add" onClick={handleAddUser}>
          ADD
        </button>
      </p>
      <p>
        To understand the example better, we have added borders to the table.
      </p>
    </>
  );
}

export default App;
