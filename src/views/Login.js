import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Form, Formik, Field } from "formik";
import MainContext from "contexts/MainContext";
import { TextField } from "utils/FormFields";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

const MadeWithLove = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built by  "}
      <Link component="a" color="inherit" href="https://ipsoft.com/">
        IPsoft
      </Link>
    </Typography>
  );
};

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn(props) {
  const classes = useStyles();

  const mainContext = useContext(MainContext);

  const onHandleSubmit = () => values => {
    //Perform Login

    mainContext.main.onLogin(values);
  };

  return (
    <Container component="main" maxWidth="xs">
      {mainContext.main.isAuthenticated && (
        <Redirect
          to={{
            pathname: "/Dashboard",
            state: { from: props.location }
          }}
        />
      )}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          onSubmit={onHandleSubmit(history)}
          validationSchema={LoginSchema}
          initialValues={{ email: "", password: "" }}
        >
          {props => (
            <Form
              className={classes.form}
              noValidate
              onSubmit={props.handleSubmit}
            >
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                component={TextField}
              />
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                component={TextField}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link component="a" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component="a" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}
