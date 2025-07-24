import React, { useEffect, useState } from 'react';
export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4567/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);
  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}