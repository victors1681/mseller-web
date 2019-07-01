import React, { useState } from "react";
import { Field } from "formik";
import { SelectField, PrepareDropDownOptions } from "utils/FormFields";
import { compose, graphql } from "react-apollo";
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
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default compose(graphql(Categories))(CategorySelect);
