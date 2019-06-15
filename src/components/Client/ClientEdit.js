import React from "react";
import Button from "@material-ui/core/Button";
import { TextField, Checkbox } from "utils/FormFields";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Form, Formik, Field } from "formik";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import { compose, graphql } from "react-apollo";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import * as Yup from "yup";
import { showGraphQLError, showSuccess } from "utils/notifications";
import CLIENT_BY_CODE from "./schema/client_all_fields.graphql";
import ADD_NEW_CLIENT from "./schema/client_add_new.graphql";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ClientSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  code: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  name: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  NCF: Yup.string()
    .min(9, "Too Short!")
    .max(9, "Too Long!"),
  city: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!"),
  state: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!"),
  zipCode: Yup.string()
    .min(5, "Too Short!")
    .max(5, "Too Long!"),
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  fax: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  sellerCode: Yup.string().required("Required"),
  sellerName: Yup.string().required("Required"),
  field1: Yup.string(),
  field2: Yup.string(),
  field3: Yup.string(),
  field4: Yup.number(),
  field5: Yup.number(),
  field6: Yup.number()
});

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  paddingBottom: {
    paddingBottom: "0px"
  }
}));

const getClientDetailView = (edit, classes) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={1}>
      <Field
        required
        id="code"
        name="code"
        label="Code"
        fullWidth
        autoComplete="ccode"
        component={TextField}
        disabled={!!edit}
      />
    </Grid>
    <Grid item xs={12} sm={9}>
      <Field
        required
        id="name"
        name="name"
        label="Name"
        fullWidth
        autoComplete="cname"
        component={TextField}
      />
    </Grid>
    <Grid item xs={12} sm={2}>
      <Field
        id="rnc"
        name="RNC"
        label="NCF"
        fullWidth
        autoComplete="lname"
        component={TextField}
      />
    </Grid>
    <Grid item xs={12} sm={12}>
      <Field
        required
        id="address"
        name="address"
        label="Address"
        fullWidth
        autoComplete="off"
        component={TextField}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <Field
        required
        id="city"
        name="city"
        label="City"
        fullWidth
        component={TextField}
        autoComplete="off"
      />
    </Grid>
    <Grid item xs={12} sm={3}>
      <Field
        required
        fullWidth
        name="state"
        label="State"
        id="state"
        autoComplete="off"
        component={TextField}
      />
    </Grid>
    <Grid item xs={12} sm={3}>
      <Field
        required
        fullWidth
        name="country"
        label="Country"
        id="country"
        autoComplete="false"
        component={TextField}
      />
    </Grid>
    <Grid item xs={12} sm={2}>
      <Field
        fullWidth
        name="zipCode"
        label="Zip Code"
        id="zipCode"
        autoComplete="false"
        component={TextField}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <Field
        required
        id="phone"
        name="phone"
        label="Phone"
        fullWidth
        autoComplete="off"
        component={TextField}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <Field
        id="fax"
        name="fax"
        label="Fax"
        fullWidth
        autoComplete="off"
        component={TextField}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <Field
        required
        id="email"
        name="email"
        label="Email"
        fullWidth
        autoComplete="off"
        component={TextField}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <Field
        required
        id="sellerCode"
        name="sellerCode"
        label="Seller Code"
        fullWidth
        autoComplete="off"
        component={TextField}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <Field
        required
        id="sellerName"
        name="sellerName"
        label="Seller Name"
        fullWidth
        autoComplete="off"
        component={TextField}
      />
    </Grid>
    <Grid item xs={12} sm={4} />
    <Grid item xs={12} sm={12}>
      <Typography
        color="textSecondary"
        variant="body1"
        className={classes.paddingBottom}
      >
        Optional Parameters
      </Typography>
      <Divider />
    </Grid>
    <Grid item xs={6} sm={2}>
      <Field
        required
        id="field1"
        name="field1"
        label="Field 1"
        fullWidth
        autoComplete="off"
        component={TextField}
      />
    </Grid>
    <Grid item xs={6} sm={2}>
      <Field
        required
        id="field2"
        name="field2"
        label="Field 2"
        fullWidth
        autoComplete="off"
        component={TextField}
      />
    </Grid>
    <Grid item xs={6} sm={2}>
      <Field
        required
        id="field3"
        name="field3"
        label="Field 3"
        fullWidth
        autoComplete="off"
        component={TextField}
      />
    </Grid>
    <Grid item xs={6} sm={2}>
      <Field
        required
        id="field4"
        name="field4"
        label="Field 4"
        fullWidth
        autoComplete="off"
        component={TextField}
      />
    </Grid>
    <Grid item xs={6} sm={2}>
      <Field
        required
        id="field5"
        name="field5"
        label="Field 5"
        fullWidth
        autoComplete="off"
        component={TextField}
      />
    </Grid>
    <Grid item xs={6} sm={2}>
      <Field
        required
        id="field6"
        name="field6"
        label="Field 6"
        fullWidth
        autoComplete="off"
        component={TextField}
      />
    </Grid>
    <Grid item xs={12}>
      <FormControlLabel
        control={<Field id="status" name="status" component={Checkbox} />}
        label="Active"
      />
    </Grid>
  </Grid>
);

const ClientEdit = ({ closeModal, edit, data, addNewClient, setErrors }) => {
  const classes = useStyles();

  const onHandleSubmit = () => (
    values,
    { setSubmitting, setStatus, resetForm, error }
  ) => {
    //Perform Login
    addNewClient({
      variables: {
        ...values,
        status: values.status ? "A" : "S",
        field4: parseFloat(values.field4),
        field5: parseFloat(values.field5),
        field6: parseFloat(values.field6)
      }
    })
      .then(result => {
        Object.keys(values).forEach(key => (values[key] = ""));
        resetForm(values);
        showSuccess(`${result.data.addClient.name} created`);
        setStatus(true);
      })
      .catch(err => {
        showGraphQLError(err);
        setStatus({ success: false });
        setSubmitting(false);
        setErrors({ submit: error.message });
      });
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
        maxWidth="md"
      >
        <Formik
          onSubmit={onHandleSubmit()}
          validationSchema={ClientSchema}
          initialValues={{
            ...data.client,
            status: (edit && data.client.status === "A") || (!edit && true)
          }}
        >
          {props => (
            <Form noValidate onSubmit={props.handleSubmit}>
              <DialogTitle id="form-dialog-title">
                {edit ? `Editing Client: ${edit}` : "Create New Client"}
              </DialogTitle>
              <DialogContent>
                {getClientDetailView(edit, classes)}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => closeModal()}>Cancel</Button>
                <Button color="primary" variant="contained" type="submit">
                  Create
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </React.Fragment>
  );
};

export default compose(
  graphql(CLIENT_BY_CODE, {
    options: props => ({ variables: { code: props.edit } })
  }),
  graphql(ADD_NEW_CLIENT, { name: "addNewClient" })
)(ClientEdit);
