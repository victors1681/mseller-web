import React from "react";
//import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import ClientSelector from "components/Client/ClientSelector";
/*
    top: -32px;
    left: -32px;
    right: -32px;
    position: relative;
    width: 110%;
    background: white;
    border-bottom: 1px solid #e0e0e0;
    height: 50px;
    vertical-align: middle;
    display: flex;
    align-items: center;
    padding: 10px;

*/

const useStyle = makeStyles(theme => ({
  container: {
    padding: theme.spacing(0),
    width: "100%"
  },
  clientContainer: {
    minHeight: "200px"
  }
}));

const Document = () => {
  const classes = useStyle();

  return (
    <React.Fragment>
      <div className={classes.container}>
        <Box
          component="span"
          display="block"
          p={1}
          m={1}
          bgcolor="background.paper"
        >
          <ClientSelector />
        </Box>
        <Box
          component="span"
          display="block"
          p={1}
          m={1}
          bgcolor="background.paper"
        >
          block
        </Box>
      </div>
    </React.Fragment>
  );
};
export default Document;
