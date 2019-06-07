import React from "react";
import Header from "components/Header";
import UserEdit from "components/user/UserEdit";
import UserList from "components/user/UserList";

function Users() {
  const { user } = { user: "" };

  return (
    <React.Fragment>
      <Header title="List of users" />
      {user.ui.editModal.open && <UserEdit />}
      <UserList />
    </React.Fragment>
  );
}

export default Users;
