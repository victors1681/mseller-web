import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Grid from "@material-ui/core/Grid";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UnitsSelect from "components/Units/UnitsSelect";
import Divider from "@material-ui/core/Divider";
import { Field } from "formik";
import { TextField } from "utils/FormFields";
//import { compose, graphql } from "react-apollo";
import { injectIntl } from "react-intl";
import WarehouseMultiField from "components/Warehouse/WarehouseMultiField";
//import { Warehouse } from "../Warehouse/schema/warehouse.graphql";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  header: {
    background: theme.palette.background.default
  }
}));

const InventorySection = ({ intl, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          className={classes.header}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>
              {intl.formatMessage({
                id: "product.inventory.header",
                defaultMessage: "Inventory "
              })}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {intl.formatMessage({
                id: "product.inventory.subTitle",
                defaultMessage: "Manage your stock and warehouse "
              })}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <UnitsSelect />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                showsymbol
                required
                id="unitCost"
                name="unitCost"
                translation="product.inventory.unitCost"
                label="Unit Cost"
                fullWidth
                autoComplete="off"
                type="number"
                component={TextField}
              />
            </Grid>
            <Grid item sm={12}>
              <Divider />
            </Grid>
            <Grid item sm={12}>
              <WarehouseMultiField {...props} />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default injectIntl(InventorySection);
