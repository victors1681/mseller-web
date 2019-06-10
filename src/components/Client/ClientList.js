import React, { useState } from "react";
import MaterialTable from "material-table";
import Icons from "utils/materialIcons";
import { graphql, compose } from "react-apollo";
import CLIENT_QUERY from "./schema/clients_short_list.graphql";
import ClientEdit from "./ClientEdit";

const ClientsList = ({ data }) => {
  const columns = [
    { title: "Code", field: "code" },
    { title: "Status", field: "status" },
    { title: "Name", field: "name" },
    { title: "City", field: "city" },
    { title: "Seller", field: "sellerName" }
  ];

  const [edit, setEdit] = useState(false);

  const closeEditMode = () => setEdit(null);
  const openEditMode = clientId => setEdit(clientId);

  const handleRowClick = (_, rowData) => {
    openEditMode(rowData.code);
  };

  return (
    <React.Fragment>
      <MaterialTable
        title="Editable Example"
        columns={columns}
        data={data.clients}
        icons={Icons}
        onRowClick={handleRowClick}
        options={{
          pageSize: 10
        }}
      />
      {edit && <ClientEdit edit={edit} closeModal={closeEditMode} />}
    </React.Fragment>
  );
};

export default compose(graphql(CLIENT_QUERY))(ClientsList);
