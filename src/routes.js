import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MainContext from "contexts/MainContext";
import NotFound from "components/NotFound";
import Login from "views/Login";
import Layout from "views/Layout";
import Logs from "views/Logs";
import Dashboard from "./views/Dashboard";
import Users from "./views/Users";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const mainContext = useContext(MainContext);

  const isAuthenticated = mainContext.main.isAuthenticated;

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute
          key="Dashboard"
          path="/Dashboard"
          component={Dashboard}
          isAuthenticated={isAuthenticated}
          exact
        />
        <PrivateRoute
          key="Dashboard"
          path="/"
          component={Dashboard}
          exact
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          key="Logs"
          path="/Logs"
          component={Logs}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          key="Users"
          path="/Users"
          component={Users}
          isAuthenticated={isAuthenticated}
        />
        {/* <Route path="/Users" component={Users} /> */}
        <PrivateRoute component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
