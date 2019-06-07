import React from "react";
import Button from "@material-ui/core/Button";
import { TextField, Checkbox } from "utils/FormFields";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Form, Formik, Field } from "formik";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Roles from "components/Roles";

const UserEdit = () => {
  const { roles, user } = { user: "", roles: [] };

  const rolesList = roles.content;

  const isEditingMode = !!user.ui.editModal.id !== "new";

  const userRole = user.userEdit.roles;

  const onHandleSubmit = () => values => {
    //Perform Login
    console.error("VALUES FROM", values);
  };

  const onValidate = values => {
    const errors = {};
    if (!values.email || !values.password) {
      errors.name = "Name is required";
    }
    return errors;
  };

  return (
    <React.Fragment>
      <Dialog
        open
        onClose={() => user.onCloseUserEditModal()}
        aria-labelledby="form-dialog-title"
      >
        <Formik
          onSubmit={onHandleSubmit(history)}
          validate={onValidate}
          initialValues={user.userEdit}
        >
          {props => (
            <Form noValidate onSubmit={props.handleSubmit}>
              <DialogTitle id="form-dialog-title">Create New User</DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      required
                      id="firstName"
                      name="firstName"
                      label="First name"
                      fullWidth
                      autoComplete="fname"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      required
                      id="lastName"
                      name="lastName"
                      label="Last name"
                      fullWidth
                      autoComplete="lname"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      required
                      id="username"
                      name="username"
                      label="Username"
                      fullWidth
                      autoComplete="fuser"
                      component={TextField}
                      disabled={isEditingMode}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      component={TextField}
                      disabled={isEditingMode}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                        <Field
                          id="enabled"
                          name="enabled"
                          component={Checkbox}
                        />
                      }
                      label="Active"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => user.onCloseUserEditModal()}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button color="primary" type="submit">
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

export default UserEdit;
