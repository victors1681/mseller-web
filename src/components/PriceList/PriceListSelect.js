import React from "react";
import { Field } from "formik";
import { SelectField } from "utils/FormFields";

const PrepareDropDownOptions = data =>
  (data || []).map(p => ({
    value: p.id,
    label: p.percentage ? `${p.name} - ${p.percentage}%` : `${p.name}`
  }));
const PriceListSelect = ({ name, data }) => {
  return (
    <>
      <Field
        required
        id={name}
        name={name}
        translation="priceList.select"
        label="Price List"
        fullWidth
        options={PrepareDropDownOptions(data && data.priceListAll)}
        component={SelectField}
        autoComplete="off"
        tooltip="Add New Price List"
      />
    </>
  );
};

export default PriceListSelect;
