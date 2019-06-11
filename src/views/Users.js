import React, { useState } from "react";
import Header from "components/Header";
import UserList from "components/user/UserList";
import UserEdit from "components/user/UserEdit";

function Users() {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <React.Fragment>
      <Header title="List of users" handleNew={handleClick} />
      <UserList />
      {open && <UserEdit edit={null} closeModal={closeModal} />}
    </React.Fragment>
  );
}

export default Users;
