/*eslint-disable*/
import { hot, setConfig } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { DragDropContext } from "react-beautiful-dnd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./routes";
import theme from "./common/theme/theme";
import "./common/theme/fontFace.scss";
import client from "./apolloClient";
import { ApolloProvider } from "react-apollo";

setConfig({
  reloadHooks: false
});

const App = () => (
  <DragDropContext>
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </MuiThemeProvider>
    <ToastContainer />
  </DragDropContext>
);
const AppComponent = hot(module)(App);
ReactDOM.render(<AppComponent />, document.getElementById("mainApp"));
