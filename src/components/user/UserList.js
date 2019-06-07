import React, { useContext, useEffect } from "react";
import MainContext from "contexts/MainContext";
import MUIDataTable from "mui-datatables";

function UserList() {
  const { user } = useContext(MainContext);

  useEffect(() => {
    user.getUsersList();
  }, [user]);

  const renderActive = value => (value ? "Enabled" : "Disable");

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

  const onRowClick = colData => {
    user.onEditUserModal({ id: colData[0] });
  };

  const options = {
    filterType: "checkbox",
    onRowClick: onRowClick,
    elevation: 1
  };

  return (
    <MUIDataTable
      title=""
      data={user.users}
      columns={columns}
      options={options}
    />
  );
}

export default UserList;
