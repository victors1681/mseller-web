import React from "react";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import { Form, Formik, Field } from "formik";
import { TextField } from "utils/FormFields";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { graphql, compose } from "react-apollo";
import { gql } from "apollo-boost";

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
      <Link component="a" color="inherit" href="https://mobile-seller.com/">
        MSeller
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
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  }
}));

const SignIn = ({ loginUser, location, history }) => {
  const classes = useStyles();
  const isAuthenticated = false;

  const onHandleSubmit = () => values => {
    //Perform Login

    loginUser({
      variables: values
    })
      .then(response => {
        localStorage.setItem("token", response.data.login);
        //client.writeData({ data: { isLoggedIn: true } });
        history.push("/Dashboard");
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      {isAuthenticated && (
        <Redirect
          to={{
            pathname: "/Dashboard",
            state: { from: location }
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
          onSubmit={onHandleSubmit()}
          validationSchema={LoginSchema}
          initialValues={{ email: "", password: "" }}
        >
          {() => (
            <Form className={classes.form} noValidate>
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

              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  load
                  className={classes.submit}
                  disabled={loginUser.loading}
                >
                  Sign In
                </Button>
                {loginUser.loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
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
};

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
export default compose(graphql(LOGIN_USER, { name: "loginUser" }))(SignIn);
