import React, { useEffect } from "react";
import useFetchUsers from "../../hooks/useFetchUsers";
import { User } from "../../types/User";

type UserListProps = {
  user: User | null;
  setUser: (user: User) => void;
};
const UsersList = ({ setUser, user }: UserListProps) => {
  const url = "http://localhost:3001/users";
  const { loading, error, users, deleteRequest, getRequest } =
    useFetchUsers(url);

  useEffect(() => {
    // Richiedi nuovamente gli utenti quando la richiesta di creazione è completata con successo
    getRequest();
  }, [getRequest, users]);

  const getUserSelectedHandler = (user: User) => {
    setUser(user);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-center text-white">User List</h2>
      <div className="d-flex justify-content-center">
        <ul className="list-group">
          {users.map((listUser) => (
            <button
              onClick={() => getUserSelectedHandler(listUser)}
              style={{ border: "none" }}
            >
              <li
                key={listUser.id}
                className={
                  "list-group-item" +
                  (listUser.id === user?.id ? " active" : "")
                }
                style={{ width: "300px" }}
              >
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    {listUser.name} {listUser.surname} - {listUser.role}
                  </div>
                  <div>
                    <button
                      className={
                        "btn" +
                        (listUser.id === user?.id
                          ? " btn-outline-light"
                          : " btn-outline-danger")
                      }
                      onClick={() => deleteRequest(listUser.id!)}
                    >
                      X
                    </button>
                  </div>
                </div>
              </li>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsersList;
