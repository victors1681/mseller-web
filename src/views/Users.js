import React, { useContext } from "react";
import Header from "components/Header";
import UserEdit from "components/user/UserEdit";
import UserList from "components/user/UserList";
import MainContext from "contexts/MainContext";

function Users() {
  const { user } = useContext(MainContext);

  return (
    <React.Fragment>
      <Header title="List of users" />
      {user.ui.editModal.open && <UserEdit />}
      <UserList />
    </React.Fragment>
  );
}

export default Users;
