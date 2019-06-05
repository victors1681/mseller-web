import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto"
  },
  paper: {
    width: 200,
    height: 230,
    overflow: "auto"
  },
  button: {
    margin: theme.spacing(0.5, 0)
  },
  roleHeader: {
    margin: "10px"
  },
  margin: {
    margin: "10px"
  },

  listItem: {
    minWidth: "35px"
  }
}));

const isExist = (value, arr) => {
  for (let x = 0; x < arr.length; x++) {
    if (arr[x].name === value) {
      return true;
    }
  }

  return false;
};

function not(a, b) {
  //return a.filter(value => b.indexOf(value.name) === -1);

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

const Roles = ({ field, form: { isSubmitting, errors }, ...props }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  console.log(field);

  const [left, setLeft] = React.useState(not(props.roles, props.userRole));
  const [right, setRight] = React.useState(props.userRole);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = value => () => {
    console.log(value);
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
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    // field.value = not(left, leftChecked);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    field.value = not(right, rightChecked);
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    field.value = [];
  };

  const customList = (items, column) => (
    <div>
      <Typography variant="subtitle1" className={classes.roleHeader}>
        {column === "left" ? "Available" : "Assigned"}
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
    </div>
  );

  return (
    <div>
      <Box component="div" m={1}>
        <Typography variant="h6">Roles</Typography>
        <Divider />
      </Box>
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
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(right, "right")}</Grid>
      </Grid>
    </div>
  );
};

export default Roles;
