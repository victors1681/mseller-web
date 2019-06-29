import React from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "utils/FormFields";
import Dialog from "@material-ui/core/Dialog";
import { compose, graphql } from "react-apollo";
import { makeStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { showGraphQLError } from "utils/notifications";
import { injectIntl } from "react-intl";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import { Warehouse, AddWarehouse } from "./schema/warehouse.graphql";

const WarehouseSchema = intl => {
  const required = intl.formatMessage({
    id: "common.required",
    defaultMessage: "Required"
  });

  return Yup.object().shape({
    name: Yup.string().required(required)
  });
};

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const WarehouseEdit = ({ data, addWarehouse, edit, closeModal, intl }) => {
  const classes = useStyles();
  const onHandleSubmit = () => (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    if (edit) {
      console.log("TODO: EDIT");
    } else {
      addWarehouse({ variables: values })
        .then(() => {
          closeModal();
          resetForm(values);
          setStatus(true);
          setSubmitting(false);
        })
        .catch(err => {
          showGraphQLError(err);
          setStatus({ success: false });
          setSubmitting(false);
        });
    }
  };

  if (data.loading) {
    return <CircularProgress className={classes.progress} />;
  }

  return (
    <React.Fragment>
      <Dialog
        open
        onClose={() => closeModal()}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
      >
        <Formik
          onSubmit={onHandleSubmit()}
          validationSchema={WarehouseSchema(intl)}
        >
          {props => (
            <Form noValidate onSubmit={props.handleSubmit}>
              <DialogTitle id="form-dialog-title">
                {edit
                  ? intl.formatMessage({
                      id: "warehouse.edit.header.edit",
                      defaultMessage: "Editing "
                    })
                  : intl.formatMessage({
                      id: "warehouse.edit.header.new",
                      defaultMessage: "Create New Warehouse"
                    })}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Field
                      required
                      id="name"
                      name="name"
                      translation="common.name"
                      label="Name"
                      fullWidth
                      autoComplete="off"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      id="address"
                      name="address"
                      translation="warehouse.edit.address"
                      label="Address"
                      fullWidth
                      autoComplete="off"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      multiline
                      id="observations"
                      name="observations"
                      translation="tax.edit.observations"
                      label="Observations"
                      fullWidth
                      autoComplete="off"
                      component={TextField}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => closeModal()}>
                  {intl.formatMessage({
                    id: "common.cancel",
                    defaultMessage: "Cancel"
                  })}
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={!props.dirty || props.isSubmitting}
                  type="submit"
                >
                  {edit
                    ? intl.formatMessage({
                        id: "common.edit",
                        defaultMessage: "Edit"
                      })
                    : intl.formatMessage({
                        id: "common.create",
                        defaultMessage: "Create"
                      })}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </React.Fragment>
  );
};

export default injectIntl(
  compose(
    graphql(Warehouse, {
      options: props => ({ variables: { id: props.edit } })
    }),
    graphql(AddWarehouse, { name: "addWarehouse" })
  )(WarehouseEdit)
);
