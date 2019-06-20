import React, { useState } from "react";
import Header from "components/Header";
import UserList from "components/user/UserList";
import UserEdit from "components/user/UserEdit";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ContentWrapper from "components/common/ContentWrapper";

const useStyle = makeStyles(theme => ({
  container: theme.spacing(4)
}));

function Users() {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <ContentWrapper>
      <div className={classes.container}>
        <Header title="List of users" handleNew={handleClick} />
        <UserList />
        {open && <UserEdit edit={null} closeModal={closeModal} />}
      </div>
    </ContentWrapper>
  );
}

export default Users;
