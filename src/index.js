import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./common/theme/theme";
import "./common/theme/fontFace.scss";
import AppProvicer from "./AppProvider";

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <AppProvicer>
      <Routes />
    </AppProvicer>
  </MuiThemeProvider>,
  document.getElementById("mainApp")
);
