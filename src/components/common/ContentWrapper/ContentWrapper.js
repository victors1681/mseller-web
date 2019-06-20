import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyle = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(4)
  }
}));

const ContentWrapper = ({ children }) => {
  const classes = useStyle();
  return <div className={classes.wrapper}> {children}</div>;
};

export default ContentWrapper;
