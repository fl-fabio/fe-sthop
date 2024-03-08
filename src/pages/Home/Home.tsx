import React from "react";
import UsersList from "../../components/UserList/UserList";
import SignUpForm from "../../components/SignupForm/SignupForm";
import useFetchUsers from "../../hooks/useFetchUsers";
const Home = () => {
  const { user, setUser } = useFetchUsers("http://localhost:3001/users");

  return (
    <div>
      <br />
      <div className="d-flex justify-content-center">
        <SignUpForm setUser={setUser} user={user} />
      </div>
      <br />
      <UsersList setUser={setUser} user={user} />
    </div>
  );
};

export default Home;
