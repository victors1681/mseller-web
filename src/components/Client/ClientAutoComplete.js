import React from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import DownShift from "utils/downShift";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { Clients } from "./schema/Clients.graphql";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  progress: {
    margin: theme.spacing(4)
  }
}));

function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem,
    classes
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected =
    ((selectedItem && selectedItem.name) || "").indexOf(suggestion.name) > -1;

  return (
    <ListItem
      {...itemProps}
      button
      key={suggestion.name}
      selected={isHighlighted}
      style={{
        fontWeight: isSelected ? 500 : 400,
        paddingTop: "0px",
        paddingBottom: "0px"
      }}
    >
      <ListItemText
        primary={suggestion.name}
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {suggestion.code}
            </Typography>
            {`  |    ${suggestion.address} | ${suggestion.city}`}
          </>
        }
      />
    </ListItem>
  );
}

const ClientAutocompleteMenu = ({
  data: { clients, loading },
  selectedItem,
  highlightedIndex,
  getItemProps
}) => {
  const classes = useStyles();

  if (loading) {
    return (
      <Paper className={classes.paper} square>
        <Box display="flex" justifyContent="center">
          <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.progress}
            size={24}
            thickness={4}
          />
        </Box>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} square>
      {clients &&
        clients.map((suggestion, index) =>
          renderSuggestion({
            suggestion,
            index,
            itemProps: getItemProps({
              item: suggestion,
              index,
              key: suggestion.code
            }),
            highlightedIndex,
            selectedItem,
            classes
          })
        )}
    </Paper>
  );
};

const ClientMenu = compose(graphql(Clients))(ClientAutocompleteMenu);

const ClientDown = () => (
  <DownShift Component={ClientMenu} label="Clients" placeholder="Client Name" />
);

export default ClientDown;
