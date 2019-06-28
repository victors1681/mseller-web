import React from "react";
import TextFieldM from "@material-ui/core/TextField";
import CheckboxM from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropsType from "prop-types";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

import { injectIntl } from "react-intl";

export const PrepareDropDownOptions = data =>
  (data || []).map(d => ({ label: d.name, value: d.id }));

export const TextField = injectIntl(
  ({ field, form: { isSubmitting, errors, touched }, intl, ...props }) => {
    const hasError = !!errors[field.name] && touched[field.name];
    return (
      <FormControl error={hasError} style={{ width: "100%" }}>
        <TextFieldM
          // variant="outlined"

          {...field}
          {...props}
          margin="dense"
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
    <Grid container spacing={1} alignItems="flex-end">
      <Grid item xs={props.addNew ? 11 : 12}>
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
      </Grid>
      {props.addNew && (
        <Grid item xs={1}>
          <Tooltip title={props.tooltip}>
            <IconButton size="small" color="secondary" onClick={props.addNew}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );
};

SelectField.prototype = {
  options: PropsType.array.isRequired,
  tooltip: PropsType.string,
  addNew: PropsType.func
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export const MultiSelect = ({
  field,
  form: { isSubmitting, errors },
  ...props
}) => {
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  function handleChange(event) {
    setSelectedOptions(event.target.value);
    // setFieldValue(field.name, event.target.value);
  }

  return (
    <Grid container spacing={1} alignItems="flex-end">
      <Grid item xs={props.addNew ? 11 : 12}>
        <FormControl style={{ width: "100%" }}>
          <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
          <Select
            {...field}
            {...props}
            multiple
            value={selectedOptions}
            onChange={handleChange}
            renderValue={selected =>
              (props.options || [])
                .filter(f => selected.includes(f.value))
                .map(v => v.label)
                .join(", ")
            }
            MenuProps={MenuProps}
            error={!!errors[field.name]}
            disabled={isSubmitting || props.disabled}
          >
            {(props.options || []).map(m => (
              <MenuItem key={m.value} value={m.value}>
                <CheckboxM checked={selectedOptions.indexOf(m.value) > -1} />
                <ListItemText primary={m.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {props.addNew && (
        <Grid item xs={1}>
          <Tooltip title={props.tooltip}>
            <IconButton size="small" color="secondary" onClick={props.addNew}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );
};

MultiSelect.prototype = {
  options: PropsType.array.isRequired,
  tooltip: PropsType.string,
  addNew: PropsType.func
};
