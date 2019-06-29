import React, { useState } from "react";
import { FieldArray, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "utils/FormFields";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import WarehouseSelect from "components/Warehouse/WarehouseSelect";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import shortId from "shortid";
import WarehouseEdit from "components/Warehouse/WarehouseEdit";
import { compose, graphql } from "react-apollo";
import { injectIntl } from "react-intl";
import { Warehouse } from "./schema/warehouse.graphql";

const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  buttons: {
    textAlign: "center"
  }
}));

const WarehouseMultiField = ({ intl, data, values }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleNew = () => {
    setOpen(true);
  };
  const closeEditMode = () => {
    data.refetch();
    setOpen(null);
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        color="secondary"
        className={classes.button}
        onClick={handleNew}
      >
        <AddCircleIcon className={classes.leftIcon} />

        {intl.formatMessage({
          id: "warehouse.edit.add",
          defaultMessage: "Add New Warehouse "
        })}
      </Button>
      {open && <WarehouseEdit closeModal={closeEditMode} />}

      <FieldArray
        name="warehouses"
        render={arrayHelpers => (
          <div>
            {values.warehouses && values.warehouses.length > 0 ? (
              values.warehouses.map((warehouse, index) => (
                <Grid
                  container
                  key={shortId()}
                  spacing={2}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <WarehouseSelect
                      //  value={warehouse.id}
                      data={data}
                      // name={`friends[${index}].name`
                      name={`warehouses[${index}].id`}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      showsymbol
                      required
                      id={`initialQuantity.${index}`}
                      // name={`initialQuantity.${index}`}
                      name={`warehouses[${index}].initialQuantity`}
                      translation="warehouse.select.initialQuantity"
                      label="Initial Quantity"
                      fullWidth
                      autoComplete="off"
                      component={TextField}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={2} className={classes.buttons}>
                    <ButtonGroup
                      size="small"
                      aria-label="Small outlined button group"
                    >
                      <Button
                        disabled={!(index > 0)}
                        onClick={() =>
                          index > 0 ? arrayHelpers.remove(index) : null
                        }
                      >
                        -
                      </Button>
                      <Button onClick={() => arrayHelpers.insert(index, "")}>
                        +
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              ))
            ) : (
              <button type="button" onClick={() => arrayHelpers.push("")}>
                {/* show this when user has removed all friends from the list */}
                Add a friend
              </button>
            )}
          </div>
        )}
      />
    </React.Fragment>
  );
};

export default injectIntl(compose(graphql(Warehouse))(WarehouseMultiField));
