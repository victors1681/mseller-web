import React from "react";
import TextFieldM from "@material-ui/core/TextField";
import CheckboxM from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { injectIntl } from "react-intl";

export const TextField = injectIntl(
  ({ field, form: { isSubmitting, errors, touched }, intl, ...props }) => {
    const hasError = !!errors[field.name] && touched[field.name];
    return (
      <FormControl error={hasError} style={{ width: "100%" }}>
        <TextFieldM
          {...field}
          {...props}
          label={
            props.translation
              ? intl.formatMessage({
                  id: props.translation,
                  defaultMessage: props.label
                })
              : props.label
          }
          value={field.value ? field.value : ""}
          inputProps={{
            autoComplete: "new-password",
            form: {
              autoComplete:
                props.autoComplete === "off" ? "off" : props.autoComplete
            }
          }}
          error={hasError}
          disabled={isSubmitting || props.disabled}
          type={props.type ? props.type : "text"}
        />
        <FormHelperText id="component-error-text">
          {hasError && errors[field.name]}
        </FormHelperText>
      </FormControl>
    );
  }
);

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

export const SelectField = ({
  field,
  form: { isSubmitting, errors, setFieldValue },
  ...props
}) => {
  return (
    <FormControl style={{ width: "100%", verticalAlign: "none" }}>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <Select
        {...field}
        {...props}
        onChange={e => {
          setFieldValue(field.name, e.target.value);
        }}
        error={!!errors[field.name]}
        disabled={isSubmitting || props.disabled}
      >
        {(props.options || []).map(m => (
          <MenuItem key={m.value} value={m.value}>
            {m.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
