import React from "react";
import Downshift from "downshift";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
}
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    height: 50
  },
  container: {
    flexGrow: 1,
    position: "relative"
  }
}));
/*eslint-disable*/

const IntegrationDownshift = ({ Component, label, placeholder }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Downshift
        onChange={item => alert(item)}
        itemToString={item => (item ? item.name : "")}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder
          });

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                label,
                InputLabelProps: getLabelProps({ shrink: true }),
                InputProps: { onBlur, onFocus },
                inputProps
              })}
              {isOpen ? (
                <div {...getMenuProps()}>
                  <Component
                    {...{
                      name: inputValue,
                      selectedItem,
                      highlightedIndex,
                      getItemProps
                    }}
                  />
                </div>
              ) : null}
            </div>
          );
        }}
      </Downshift>
    </div>
  );
};

export default IntegrationDownshift;
