import React from "react";
import Grid from "@material-ui/core/Grid";
import ClientAutoComplete from "./ClientAutoComplete";

const ClientSelector = ({ findClient }) => {
  console.log(findClient);

  return (
    <Grid container>
      <Grid item xs={2}>
        Customer:
      </Grid>
      <Grid item xs={10}>
        <ClientAutoComplete />
      </Grid>
    </Grid>
  );
};

export default ClientSelector;
