import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8"
  },
  indicator: {
    backgroundColor: "#1890ff"
  }
})(Tabs);
const AntTab = withStyles(theme => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  selected: {}
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paddingTop: {
    paddingTop: theme.spacing(1)
  },
  bg: {
    backgroundColor: theme.palette.background.paper
  }
}));

const getTaps = tabs =>
  tabs.map(tab => <AntTab key={tab.name} label={tab.name} />);

export default function CustomizedTabs({ tabs = [] }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const Component = tabs[value].component;
  return (
    <div className={classes.root}>
      <div className={classes.bg}>
        <AntTabs value={value} onChange={handleChange}>
          {getTaps(tabs)}
        </AntTabs>
        <div className={classes.paddingTop}>{Component}</div>
      </div>
    </div>
  );
}
