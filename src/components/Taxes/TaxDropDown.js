import React, { useState } from "react";
import { Field } from "formik";
import { MultiSelect } from "utils/FormFields";
import { compose, graphql } from "react-apollo";
import { injectIntl } from "react-intl";
import TaxEdit from "./TaxEdit";
import { Taxes } from "./schema/taxes.graphql";

export const PrepareDropDownOptions = (data, { tax }, setFieldValue) => {
  if (tax.includes("none") && tax.length > 1) {
    setFieldValue("tax", ["none"]);
  }
  return (data || []).map(d => ({
    label: `${d.name} - ${d.percentage.toFixed(2)}`,
    value: d.id,
    disabled: tax.includes("none")
  }));
};

const TaxDropDown = ({
  data,
  data: { taxes },
  intl,
  values,
  setFieldValue
}) => {
  const [open, setOpen] = useState(false);

  const handleNew = () => {
    setOpen(true);
  };
  const closeEditMode = () => {
    data.refetch();
    setOpen(null);
  };

  const prepareOptions = () => {
    const taxArr = PrepareDropDownOptions(taxes, values, setFieldValue);

    taxArr.unshift({
      value: "none",
      label: intl.formatMessage({
        id: "common.none",
        defaultMessage: "None"
      })
    });

    return taxArr;
  };
  return (
    <React.Fragment>
      {open && <TaxEdit closeModal={closeEditMode} />}
      <Field
        required
        id="tax"
        name="tax"
        translation="common.tax"
        label={intl.formatMessage({
          id: "tax.dropDown.label",
          defaultMessage: "Tax"
        })}
        fullWidth
        options={prepareOptions()}
        component={MultiSelect}
        autoComplete="off"
        tooltip="Add New Tax"
        new={handleNew}
      />
    </React.Fragment>
  );
};

export default injectIntl(compose(graphql(Taxes))(TaxDropDown));
