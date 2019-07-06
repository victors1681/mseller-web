import React, { useState } from "react";
import MaterialTable from "material-table";
import Icons from "utils/materialIcons";
import { compose, graphql } from "react-apollo";
import StatusColor from "components/common/StatusColor";
import Currency from "components/common/Currency";
import { FormattedNumber } from "react-intl";
import { Products } from "./schema/products.graphql";
import ProductEdit from "./ProductEdit";

const ProductList = ({ data }) => {
  const columns = [
    { title: "code", field: "code" },
    { title: "Unit", field: "inventory.unit.shortName" },
    { title: "Name", field: "name" },
    {
      title: "Price",
      field: "price.price",
      render: rowData => <Currency value={rowData.price[0].price} />
    },
    {
      title: "Stock",
      field: "stock",
      render: rowData => <FormattedNumber value={rowData.stock} />
    },
    {
      title: "Status",
      field: "status",
      render: rowData => <StatusColor status={rowData.status} />
    }
  ];

  const [edit, setEdit] = useState(false);
  const closeEditMode = () => {
    data.refetch();
    setEdit(null);
  };
  const reFetchProductList = () => data.refetch();
  const openEditMode = clientId => setEdit(clientId);

  const handleRowClick = (_, rowData) => {
    openEditMode(rowData["code"]);
  };

  return (
    <React.Fragment>
      <MaterialTable
        title=""
        columns={columns}
        data={data.products}
        isLoading={data.loading}
        icons={Icons}
        onRowClick={handleRowClick}
        options={{
          pageSize: 10
        }}
      />
      {edit && (
        <ProductEdit
          edit={edit}
          reFetchProductList={reFetchProductList}
          closeModal={closeEditMode}
        />
      )}
    </React.Fragment>
  );
};

export default compose(
  graphql(Products, {
    options: () => ({ variables: { code: null } })
  })
)(ProductList);
