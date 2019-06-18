import React from "react";
import Grid from "@material-ui/core/Grid";
import { compose, graphql } from "react-apollo";
import DownShift from "utils/downShift";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Clients } from "./schema/Clients.graphql";

const ClientSelector = ({ findClient }) => {
  console.log(findClient);

  return (
    <Grid container>
      <Grid item xs={2}>
        Customer:
      </Grid>
      <Grid item xs={10}>
        <DownShift Component={ClientMenu} />
      </Grid>
    </Grid>
  );
};

export default ClientSelector;

const ClientMenu = compose(graphql(Clients))(ApolloAutocompleteMenu);

function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.name}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.name}
    </MenuItem>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 50
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "auto",
    flexGrow: 1
  },
  divider: {
    height: theme.spacing(2)
  }
}));

function ApolloAutocompleteMenu({
  data: { clients, loading },
  selectedItem,
  highlightedIndex,
  getItemProps
}) {
  if (loading) {
    return <div>Loading...</div>;
  }
  const classes = useStyles();

  return (
    <Paper className={classes.paper} square>
      {clients &&
        clients.map((suggestion, index) =>
          renderSuggestion({
            suggestion,
            index,
            itemProps: getItemProps({ item: suggestion.name }),
            highlightedIndex,
            selectedItem
          })
        )}
    </Paper>
  );
}
