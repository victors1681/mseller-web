import React, { useState } from "react";
import { Field } from "formik";
import { SelectField, PrepareDropDownOptions } from "utils/FormFields";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import UnitEdit from "./UnitEdit";
import { Units } from "./schema/units.graphql";

const UnitsSelect = ({ data, data: { units } }) => {
  const [unitOpen, setUnitOpen] = useState(false);

  const handleNew = () => {
    setUnitOpen(true);
  };
  const closeEditMode = () => {
    data.refetch();
    setUnitOpen(null);
  };

  return (
    <>
      {unitOpen && <UnitEdit closeModal={closeEditMode} />}
      <Field
        required
        id="unit"
        name="unit"
        translation="common.unit"
        label="Unit"
        fullWidth
        options={PrepareDropDownOptions(units)}
        component={SelectField}
        autoComplete="off"
        tooltip="Add New Unit"
        new={handleNew}
      />
    </>
  );
};

export default compose(graphql(Units))(UnitsSelect);
