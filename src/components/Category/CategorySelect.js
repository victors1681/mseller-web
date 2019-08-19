import React, { useState } from "react";
import { Field } from "formik";
import { SelectField, PrepareDropDownOptions } from "utils/FormFields";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import CategoryEdit from "./CategoryEdit";
import { Categories } from "./schema/category.graphql";

const CategorySelect = ({ data, data: { categories } }) => {
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleNew = () => {
    setCategoryOpen(true);
  };
  const closeEditMode = () => {
    data.refetch();
    setCategoryOpen(null);
  };

  return (
    <>
      {categoryOpen && <CategoryEdit closeModal={closeEditMode} />}
      <Field
        required
        id="category"
        name="category"
        translation="common.category"
        label="Category"
        fullWidth
        options={PrepareDropDownOptions(categories)}
        component={SelectField}
        autoComplete="off"
        tooltip="Add New Category"
        new={handleNew}
      />
    </>
  );
};

export default compose(graphql(Categories))(CategorySelect);
