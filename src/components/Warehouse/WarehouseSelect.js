import React from "react";
import { Field } from "formik";
import { SelectField, PrepareDropDownOptions } from "utils/FormFields";

const WarehouseSelect = ({ name, data }) => {
  return (
    <>
      <Field
        required
        id={name}
        name={name}
        translation="warehouse.field.warehouse"
        label="Warehouse"
        fullWidth
        options={PrepareDropDownOptions(data && data.warehouseAll)}
        component={SelectField}
        autoComplete="off"
      />
    </>
  );
};

export default WarehouseSelect;
