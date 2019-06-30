import React, { useState } from "react";
import { FieldArray, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "utils/FormFields";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PriceListSelect from "components/PriceList/PriceListSelect";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import shortId from "shortid";
import PriceListEdit from "components/PriceList/PriceListEdit";
import { compose, graphql } from "react-apollo";
import { injectIntl } from "react-intl";
import { PriceList } from "components/PriceList/schema/priceList.graphql";

const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  buttons: {
    textAlign: "center"
  }
}));

const PriceMultiField = ({ intl, data, setFieldValue }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleNew = () => {
    setOpen(true);
  };
  const closeEditMode = () => {
    data.refetch();
    setOpen(null);
  };

  const getPriceListData = id =>
    (data.priceListAll || []).find(f => f.id === id);

  const getPercentagePrice = (listPriceData, values, { price }, index) => {
    if (!listPriceData) return;

    const { percentage } = listPriceData;
    const dPrice = values.defaultPrice || 0;
    const currentPrice = dPrice - dPrice * (percentage / 100);

    if (
      listPriceData &&
      listPriceData.type === "percentage" &&
      price !== currentPrice
    ) {
      setFieldValue(`price[${index}].price`, currentPrice);
    }
    return null;
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        color="secondary"
        className={classes.button}
        onClick={handleNew}
      >
        <AddCircleIcon className={classes.leftIcon} />

        {intl.formatMessage({
          id: "price.edit.add",
          defaultMessage: "Add New PriceList "
        })}
      </Button>
      {open && <PriceListEdit closeModal={closeEditMode} />}

      <Field
        required
        id="defaultPrice"
        showsymbol
        name="defaultPrice"
        translation="price.select.price"
        label="Initial Price"
        fullWidth
        autoComplete="off"
        component={TextField}
        type="number"
      />

      <FieldArray
        name="price"
        component={({ form: { values }, remove, insert, push }) => (
          <div>
            {values.price && values.price.length > 0 ? (
              values.price.map((price, index) => {
                const listPriceData = getPriceListData(price.idPriceList);

                const disableField =
                  listPriceData && listPriceData.type === "percentage";

                getPercentagePrice(listPriceData, values, price, index);

                return (
                  <Grid
                    container
                    key={shortId()}
                    spacing={2}
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={5}>
                      <PriceListSelect
                        data={data}
                        name={`price[${index}].idPriceList`}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Field
                        required
                        id={`price.${index}`}
                        showsymbol
                        name={`price[${index}].price`}
                        translation="price.select.price"
                        label="Initial Quantity"
                        fullWidth
                        autoComplete="off"
                        component={TextField}
                        type="number"
                        disabled={disableField}
                      />
                    </Grid>
                    <Grid item xs={3} className={classes.buttons}>
                      <ButtonGroup
                        size="small"
                        aria-label="Small outlined button group"
                      >
                        <Button onClick={() => remove(index)}>-</Button>
                        <Button onClick={() => insert(index, "")}>+</Button>
                      </ButtonGroup>
                    </Grid>
                  </Grid>
                );
              })
            ) : (
              <button type="button" onClick={() => push("")}>
                {/* show this when user has removed all friends from the list */}
                Add a friend
              </button>
            )}
          </div>
        )}
      />
    </React.Fragment>
  );
};

export default injectIntl(compose(graphql(PriceList))(PriceMultiField));