import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import { dark } from "@material-ui/core/styles/createPalette";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#43C7FF", contrastText: "#fff" }, // Purple and green play nicely together.

    secondary: { main: "#295E8A" }
  },
  background: {
    default: "#fff"
  },
  overrides: {},
  typography: {
    // Use the system font instead of the default Roboto font.
    fontSize: 11,
    fontFamily: [
      "Montserrat, sans-serif",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

export default theme;
