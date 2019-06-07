import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    borderTopWidth: 0,
    borderColor: "none",
    borderStyle: "none",
    boxShadow: "none"
  },
  table: {
    minWidth: 650
  },
  progress: {
    margin: theme.spacing(2)
  }
}));

const PostTable = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      {<CircularProgress className={classes.progress} />}
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Version</TableCell>
            <TableCell align="right">Updated</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {mindContext.content.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.userId}</TableCell>
              <TableCell align="right">
                <Button>Start</Button>
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PostTable;
