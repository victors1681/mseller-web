import React from "react";
import Button from "@material-ui/core/Button";
import { TextField, Checkbox, SelectField } from "utils/FormFields";
import Dialog from "@material-ui/core/Dialog";
import { compose, graphql } from "react-apollo";
import { makeStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import GET_ALL_ROLES from "components/Roles/schema/roles_all.graphql";
import { Form, Formik, Field } from "formik";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Roles from "components/Roles";
import autoComplete from "utils/autoComplete";
import { showGraphQLError, showSuccess } from "utils/notifications";
import GET_BUSINESS_LIST from "components/Business/schema/business_all.graphql";
import * as Yup from "yup";
import USER_BY_ID from "./schema/user_edit.graphql";
import ADD_NEW_USER from "./schema/user_add.graphql";
import UPDATE_USER from "./schema/user_update.graphql";

const UserSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  firstName: Yup.string().required("Invalid First Name"),
  lastName: Yup.string().required("Invalid Last Name"),
  mode: Yup.string().required("Required"),
  business: Yup.string().required("Required")
});

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  paddingBottom: {
    paddingBottom: "0px"
  },
  grid: {
    marginBottom: "21px"
  }
}));

const UserEdit = ({
  closeModal,
  edit,
  data,
  addNewUser,
  updateUser,
  rolesData,
  businessData,
  setErrors,
  reFetchUserList
}) => {
  const classes = useStyles();
  const dataUser = data && data.user;

  const rolesList = rolesData.roles;
  const userRole = (dataUser && dataUser.roles) || [];

  const handleChangePassword = () => {};

  const onHandleSubmit = () => (
    values,
    { setSubmitting, setStatus, resetForm, error }
  ) => {
    //Perform Login
    if (edit) {
      console.log("update user", edit);
      updateUser({
        variables: { id: edit, ...values }
      })
        .then(result => {
          resetForm(values);
          showSuccess(`${result.data.updateUser} `);
          setStatus(true);
          closeModal();
        })
        .catch(err => {
          showGraphQLError(err);
          setStatus({ success: false });
          setSubmitting(false);
          setErrors({ submit: error.message });
        });
    } else {
      addNewUser({
        variables: values
      })
        .then(result => {
          Object.keys(values).forEach(key => (values[key] = ""));
          resetForm(values);
          showSuccess(`${result.register.firstName} was created`);
          setStatus(true);
          reFetchUserList();
        })
        .catch(err => {
          showGraphQLError(err);
          setStatus({ success: false });
          setSubmitting(false);
          setErrors({ submit: error.message });
        });
    }
  };

  if (data.loading || rolesData.loading || businessData.loading) {
    return <CircularProgress className={classes.progress} />;
  }

  const customValidation = values => {
    let errors = {};
    console.log(values);
    if (values.roles.length === 0) {
      errors.roles = "You need to add a least one role";
    }
    if (values.mode === "M" && values.sellerCode === "") {
      errors.sellerCode = "Need to add a seller code.";
    }
    if (!edit && (values.password.length < 6 || values.password === "")) {
      errors.password = "Password need to be grater than 5";
    }
    return errors;
  };

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
          validationSchema={UserSchema}
          validate={customValidation}
          initialValues={{
            ...dataUser,
            business: (dataUser && dataUser.business["_id"]) || "",
            status: edit ? dataUser.status : true
          }}
        >
          {props => (
            <Form noValidate onSubmit={props.handleSubmit}>
              <DialogTitle id="form-dialog-title">Create New User</DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Grid item className={classes.grid}>
                      <Field
                        required
                        id="fistName"
                        name="firstName"
                        label="First Name"
                        fullWidth
                        component={TextField}
                      />
                    </Grid>
                    <Grid item className={classes.grid}>
                      <Field
                        required
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        component={TextField}
                      />
                    </Grid>

                    <Grid item className={classes.grid}>
                      {edit ? (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleChangePassword}
                        >
                          Update Password
                        </Button>
                      ) : (
                        <Field
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          component={TextField}
                        />
                      )}
                    </Grid>
                    <Grid container>
                      <Grid item xs={6} sm={6} lg={6} className={classes.grid}>
                        <Field
                          required
                          id="mode"
                          name="mode"
                          label="User Mode"
                          options={[
                            { label: "Mobile", value: "M" },
                            { label: "Desktop", value: "D" },
                            { label: "Synchronizer", value: "S" }
                          ]}
                          fullWidth
                          component={SelectField}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} lg={6} className={classes.grid}>
                        <Field
                          style={{ "padding-left": "10px" }}
                          required
                          id="sellerCode"
                          name="sellerCode"
                          label="Seller Code"
                          fullWidth
                          component={TextField}
                        />
                      </Grid>
                    </Grid>
                    <Grid item className={classes.grid}>
                      <Field
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        component={TextField}
                      />
                    </Grid>
                    <Grid item className={classes.grid}>
                      <Field
                        required
                        id="business"
                        name="business"
                        label="Business"
                        fullWidth
                        options={businessData.business}
                        component={autoComplete}
                      />
                    </Grid>
                  </Grid>
                  <Grid item sm={8}>
                    <Field
                      required
                      id="roles"
                      name="roles"
                      label="Roles"
                      fullWidth
                      autoComplete="roles"
                      roles={rolesList}
                      userRole={userRole}
                      component={Roles}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Field id="status" name="status" component={Checkbox} />
                      }
                      label="Active"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => closeModal()}>Cancel</Button>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={
                    !props.dirty || props.isSubmitting || !props.isValid
                  }
                  type="submit"
                >
                  {edit ? "Edit " : "Create"}
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
  graphql(USER_BY_ID, {
    options: props => ({ variables: { id: props.edit } })
  }),
  graphql(GET_BUSINESS_LIST, { name: "businessData" }),
  graphql(GET_ALL_ROLES, { name: "rolesData" }),
  graphql(ADD_NEW_USER, { name: "addNewUser" }),
  graphql(UPDATE_USER, { name: "updateUser" })
)(UserEdit);
