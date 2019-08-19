import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ARightIcon from "@material-ui/icons/ChevronRight";
import ALeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import DoubleRight from "@material-ui/icons/FastForward";
import DoubleLeft from "@material-ui/icons/FastRewind";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto"
  },
  paper: {
    width: 200,
    minHeight: 400,
    overflow: "auto"
  },
  button: {
    margin: theme.spacing(0.5, 0),
    width: "20px"
  },
  roleHeader: {
    margin: "10px",
    marginBottom: "15px"
  },
  margin: {
    margin: "10px"
  },

  listItem: {
    minWidth: "35px"
  }
}));

const isExist = (value, arr) => {
  for (let x = 0; x < arr.length; x += 1) {
    if (arr[x].name === value) {
      return true;
    }
  }

  return false;
};

function not(a, b) {
  // return a.filter(value => b.indexOf(value.name) === -1);

  return a.filter(role => {
    if (!isExist(role.name, b)) {
      return role;
    }
  });
}

function intersection(a, b) {
  // return a.filter(value => b.indexOf(value.name) !== -1);
  return a.filter(role => {
    if (isExist(role.name, b)) {
      return role;
    }
  });
}

const Roles = ({ field, form: { setFieldValue }, ...props }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  useEffect(() => {
    if (props.userRole.length) {
      setFieldValue(field.name, props.userRole.map(r => r._id));
    }
  }, []);

  const [left, setLeft] = React.useState(
    not(props.roles || [], props.userRole || [])
  );
  const [right, setRight] = React.useState(props.userRole || []);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    const currentRole = right.concat(leftChecked);
    setRight(currentRole);
    setFieldValue(field.name, currentRole.map(r => r._id));

    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    field.value = not(right, rightChecked);
    setFieldValue(field.name, field.value.map(r => r._id));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    field.value = [];
    setFieldValue(field.name, []);
  };

  const customList = (items, column) => (
    <>
      <Typography
        component="span"
        variant="subtitle1"
        className={classes.roleHeader}
      >
        {column === "left" ? "Available Role" : "Assigned Role"}
      </Typography>
      <Paper className={classes.paper}>
        <List dense>
          {items.map(value => (
            <ListItem
              key={value.name}
              role={undefined}
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon className={classes.listItem}>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={`${value.name}`} />
            </ListItem>
          ))}

          <ListItem />
        </List>
      </Paper>
    </>
  );

  return (
    <>
      <Box component="div" m={1} />
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>{customList(left, "left")}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <IconButton
              className={classes.margin}
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              <DoubleRight fontSize="inherit" />
            </IconButton>

            <IconButton
              className={classes.margin}
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              <ARightIcon fontSize="inherit" />
            </IconButton>

            <IconButton
              className={classes.margin}
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              <ALeftIcon fontSize="inherit" />
            </IconButton>

            <IconButton
              className={classes.margin}
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              <DoubleLeft fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>{customList(right, "right")}</Grid>
      </Grid>
    </>
  );
};

export default Roles;
