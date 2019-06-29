import React, { useState } from "react";
import { Field } from "formik";
import { MultiSelect } from "utils/FormFields";
import { compose, graphql } from "react-apollo";
import TaxEdit from "./TaxEdit";
import { Taxes } from "./schema/taxes.graphql";

export const PrepareDropDownOptions = data =>
  (data || []).map(d => ({
    label: `${d.name} - ${d.percentage.toFixed(2)}`,
    value: d.id
  }));

const TaxDropDown = ({ data, data: { taxes } }) => {
  const [open, setOpen] = useState(false);

  const handleNew = () => {
    setOpen(true);
  };
  const closeEditMode = () => {
    data.refetch();
    setOpen(null);
  };

  return (
    <React.Fragment>
      {open && <TaxEdit closeModal={closeEditMode} />}
      <Field
        required
        id="tax"
        name="tax"
        translation="common.tax"
        label="Tax"
        fullWidth
        options={PrepareDropDownOptions(taxes)}
        component={MultiSelect}
        autoComplete="off"
        tooltip="Add New Tax"
        new={handleNew}
      />
    </React.Fragment>
  );
};

export default compose(graphql(Taxes))(TaxDropDown);
