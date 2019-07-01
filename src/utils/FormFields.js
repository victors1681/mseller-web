import React, { useContext } from "react";
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
import InputAdornment from "@material-ui/core/InputAdornment";
import CurrencyContext from "contexts/CurrencyContext";

import { injectIntl } from "react-intl";

export const PrepareDropDownOptions = data =>
  (data || []).map(d => ({ label: d.name, value: d.id }));

export const TextField = injectIntl(
  ({ field, form: { isSubmitting, errors, touched }, intl, ...props }) => {
    const hasError = !!errors[field.name] && touched[field.name];

    const { symbol } = useContext(CurrencyContext);

    return (
      <Grid container spacing={0} alignItems="flex-end">
        <Grid item xs={12}>
          <FormControl
            error={hasError}
            style={{ width: "100%", height: "65px" }}
          >
            <TextFieldM
              {...field}
              {...props}
              showsymbol={null}
              customsymbol={null}
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
              InputProps={{
                startAdornment: (props.showsymbol || props.customsymbol) && (
                  <InputAdornment position="start">
                    {props.showsymbol
                      ? symbol
                      : props.customsymbol
                      ? props.customsymbol
                      : ""}
                  </InputAdornment>
                ),
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
        </Grid>
      </Grid>
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
  form: { isSubmitting, errors, touched, setFieldValue },
  ...props
}) => {
  const hasError = !!errors[field.name] && touched[field.name];
  return (
    <Grid container spacing={0} alignItems="flex-end">
      <Grid item xs={props.new ? 11 : 12}>
        <FormControl style={{ width: "100%", verticalAlign: "none" }}>
          <InputLabel htmlFor={props.id}>
            {/* {props.translation
                ? intl.formatMessage({
                    id: props.translation,
                    defaultMessage: props.label
                  })
                : props.label} */}
            {props.label}
          </InputLabel>
          <Select
            {...field}
            {...props}
            new={null} //avoid to render on the DOM
            value={field.value || ""}
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
          <FormHelperText id="component-error-text">
            {hasError && errors[field.name]}
          </FormHelperText>
        </FormControl>
      </Grid>
      {props.new && (
        <Grid item xs={1} style={{ paddingBottom: "19px" }}>
          <Tooltip title={props.tooltip}>
            <IconButton size="small" color="secondary" onClick={props.new}>
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
  new: PropsType.func
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
  form: { isSubmitting, errors, setFieldValue },
  ...props
}) => {
  function handleChange(event) {
    setFieldValue(field.name, event.target.value);
  }

  return (
    <Grid container spacing={1} alignItems="flex-end">
      <Grid item xs={props.new ? 11 : 12}>
        <FormControl
          style={{ width: "100%", marginTop: "6px", marginBottom: "15px" }}
        >
          <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
          <Select
            {...field}
            {...props}
            new={null}
            multiple
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
              <MenuItem key={m.value} value={m.value} disabled={!!m.disabled}>
                <CheckboxM checked={field.value.indexOf(m.value) > -1} />
                <ListItemText primary={m.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {props.new && (
        <Grid item xs={1} style={{ paddingBottom: "19px" }}>
          <Tooltip title={props.tooltip}>
            <IconButton size="small" color="secondary" onClick={props.new}>
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
  new: PropsType.func
};
