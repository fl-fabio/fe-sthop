import React, { useEffect } from "react";
import useFetchUsers from "../../hooks/useFetchUsers";

const UsersList = () => {
  const url = "http://localhost:3001/users";
  const { loading, error, users, deleteRequest, getRequest } = useFetchUsers(url);

  useEffect(() => {
    // Richiedi nuovamente gli utenti quando la richiesta di creazione è completata con successo
    getRequest();
  }, [getRequest, users]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-center">User List</h2>
      <div className="d-flex justify-content-center">
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.id} className="list-group-item" style={{width: '300px'}}>
              <div className="d-flex justify-content-between">
                <div>{user.name} - {user.surname} - {user.role}</div>
                <div><button className="btn btn-outline-danger" onClick={() => deleteRequest(user.id!)}>X</button></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsersList;
