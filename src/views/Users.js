import React from "react";
import Header from "components/Header";
import UserList from "components/user/UserList";

function Users() {
  return (
    <React.Fragment>
      <Header title="List of users" />
      <UserList />
    </React.Fragment>
  );
}

export default Users;
