import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    boxShadow: "none",
    borderRadius: "10px",
    marginBottom: "20px"
  },
  title: {
    flexGrow: 1
  }
}));

const Header = ({ title = "" }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            {title}
          </Typography>
          <Fab size="small" color="primary" aria-label="Add">
            <AddIcon />
          </Fab>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
