import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Header from "components/Header";
import UserEdit from "components/user/UserEdit";
import UserList from "components/user/UserList";
import MainContext from "contexts/MainContext";

function Users() {
  const { user } = useContext(MainContext);

  return (
    <div>
      <Header title="List of users" />
      {user.ui.editModal.open && <UserEdit />}
      <UserList />
    </div>
  );
}

export default Users;
