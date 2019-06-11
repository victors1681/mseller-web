import React from "react";
import TextFieldM from "@material-ui/core/TextField";
import CheckboxM from "@material-ui/core/Checkbox";

export const TextField = ({
  field,
  form: { isSubmitting, errors },
  ...props
}) => {
  return (
    <TextFieldM
      {...field}
      {...props}
      inputProps={{
        autocomplete: "new-password",
        form: {
          autocomplete: "off"
        }
      }}
      error={!!errors[field.name]}
      disabled={isSubmitting || props.disabled}
      type={props.type ? props.type : "text"}
    />
  );
};

export const Checkbox = ({ field, form, ...props }) => {
  return (
    <CheckboxM
      {...props}
      checked={field.value}
      disabled={form.isSubmitting || props.disabled}
      onChange={() => {
        form.setFieldValue(field.name, !field.value);
      }}
    />
  );
};
