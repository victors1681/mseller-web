import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import NotFound from "components/NotFound";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Login from "views/Login";
import Layout from "views/Layout";
import Logs from "views/Logs";
import Dashboard from "./views/Dashboard";
import Users from "./views/Users";
import Clients from "./views/Clients";
import Products from "./views/Products";
import Documents from "./views/Documents";
import Document from "./views/Document";

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
export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
const Routes = () => {
  return (
    <Query query={IS_LOGGED_IN}>
      {({ data }) => {
        return (
          <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute
                key="Dashboard"
                path="/Dashboard"
                component={Dashboard}
                isAuthenticated={data}
                exact
              />
              <PrivateRoute
                key="Dashboard"
                path="/"
                component={Dashboard}
                exact
                isAuthenticated={data}
              />

              <PrivateRoute
                key="Documents"
                path="/Documents"
                component={Documents}
                isAuthenticated={data}
              />
              <PrivateRoute
                key="Document"
                path="/Document"
                component={Document}
                isAuthenticated={data}
              />
              <PrivateRoute
                key="Clients"
                path="/Clients"
                component={Clients}
                isAuthenticated={data}
              />
              <PrivateRoute
                key="Products"
                path="/Products"
                component={Products}
                isAuthenticated={data}
              />
              <PrivateRoute
                key="Logs"
                path="/Logs"
                component={Logs}
                isAuthenticated={data}
              />
              <PrivateRoute
                key="Users"
                path="/Users"
                component={Users}
                isAuthenticated={data}
              />
              {/* <Route path="/Users" component={Users} /> */}
              <PrivateRoute component={NotFound} />
            </Switch>
          </Router>
        );
      }}
    </Query>
  );
};

export default Routes;
