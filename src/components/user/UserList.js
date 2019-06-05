import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MainContext from "contexts/MainContext";
import MUIDataTable from "mui-datatables";

function UserList() {
  const { user } = useContext(MainContext);

  useEffect(() => {
    user.getUsersList();
  }, []);

  const renderActive = (value, tableMeta, updateValue) =>
    value ? "Enabled" : "Disable";

  const rows = [];
  const columns = [
    {
      name: "id",
      options: {
        display: false
      }
    },
    {
      name: "firstName",
      label: "First Name",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "lastName",
      label: "Last Name",
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: "enabled",
      label: " ",
      options: {
        customBodyRender: renderActive
      }
    }
  ];

  const onRowClick = (colData, cellMeta) => {
    user.onEditUserModal({ id: colData[0] });
  };

  const options = {
    filterType: "checkbox",
    onRowClick: onRowClick,
    elevation: 1
  };

  return (
    <div>
      <MUIDataTable
        title={""}
        data={user.users}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default UserList;
