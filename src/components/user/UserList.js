import React, { useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Icons from "utils/materialIcons";
import { compose, graphql } from "react-apollo";
import PhoneIcon from "@material-ui/icons/StayCurrentPortrait";
import DesktopIcon from "@material-ui/icons/DesktopWindows";
import SyncIcon from "@material-ui/icons/Sync";
import CircleIcon from "@material-ui/icons/FiberManualRecord";
import Green from "@material-ui/core/colors/green";
import Red from "@material-ui/core/colors/red";

import USER_LIST from "./schema/users_list.graphql";
import UserEdit from "./UserEdit";

const useStyles = makeStyles(() => ({
  iconGreen: {
    color: Green[500]
  },
  iconRed: {
    color: Red[500]
  }
}));

const getIcon = ({ mode }) => {
  switch (mode) {
    case "M":
      return <PhoneIcon />;
    case "D":
      return <DesktopIcon />;
    default:
      return <SyncIcon />;
  }
};

const UserList = ({ data }) => {
  const classes = useStyles();
  const getStatus = ({ status }) => {
    return status ? (
      <CircleIcon className={classes.iconGreen} />
    ) : (
      <CircleIcon className={classes.iconRed} />
    );
  };

  const columns = [
    { title: "id", field: "_id", hidden: true },
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Email", field: "email" },
    { title: "Status", field: "status", render: rowData => getStatus(rowData) },
    { title: "Mode", field: "mode", render: rowData => getIcon(rowData) },
    { title: "Seller #", field: "sellerCode" },
    { title: "Business", field: "business.name" }
  ];

  const [edit, setEdit] = useState(false);

  const closeEditMode = () => {
    data.refetch();
    setEdit(null);
  };
  const reFetchUserList = () => data.refetch();
  const openEditMode = clientId => setEdit(clientId);

  const handleRowClick = (_, rowData) => {
    console.log(rowData);
    openEditMode(rowData["_id"]);
  };

  return (
    <React.Fragment>
      <MaterialTable
        title=""
        columns={columns}
        data={data.users}
        isLoading={data.loading}
        icons={Icons}
        onRowClick={handleRowClick}
        options={{
          pageSize: 10
        }}
      />
      {edit && (
        <UserEdit
          edit={edit}
          reFetchUserList={reFetchUserList}
          closeModal={closeEditMode}
        />
      )}
    </React.Fragment>
  );
};

export default compose(
  graphql(USER_LIST, {
    options: () => ({ variables: { id: null } })
  })
)(UserList);
