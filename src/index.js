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
import { IntlProvider } from "react-intl";
import { ApolloProvider } from "react-apollo";
import CurrencyProvider from "components/common/Currency/CurrencyProvider";
import translation from "./common/i18n/translation";

setConfig({
  reloadHooks: false
});

const App = () => (
  <DragDropContext>
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <IntlProvider locale="es-DO" messages={translation["es"]}>
          <CurrencyProvider>
            <Routes />
          </CurrencyProvider>
        </IntlProvider>
      </ApolloProvider>
    </MuiThemeProvider>
    <ToastContainer />
  </DragDropContext>
);
const AppComponent = hot(module)(App);
ReactDOM.render(<AppComponent />, document.getElementById("mainApp"));
