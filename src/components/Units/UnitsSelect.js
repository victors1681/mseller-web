import React, { useState } from "react";
import { Field } from "formik";
import { SelectField, PrepareDropDownOptions } from "utils/FormFields";
import { compose, graphql } from "react-apollo";
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
    <React.Fragment>
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
        addNew={handleNew}
      />
    </React.Fragment>
  );
};

export default compose(graphql(Units))(UnitsSelect);
