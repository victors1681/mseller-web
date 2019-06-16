import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircleIcon from "@material-ui/icons/FiberManualRecord";
import Green from "@material-ui/core/colors/green";
import Red from "@material-ui/core/colors/red";

const useStyles = makeStyles(() => ({
  iconGreen: {
    color: Green[500]
  },
  iconRed: {
    color: Red[500]
  }
}));

const StatusColor = ({ status }) => {
  const classes = useStyles();

  return status ? (
    <CircleIcon className={classes.iconGreen} />
  ) : (
    <CircleIcon className={classes.iconRed} />
  );
};

export default StatusColor;
