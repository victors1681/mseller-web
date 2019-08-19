import React from "react";
import Button from "@material-ui/core/Button";
import { TextField, SelectField } from "utils/FormFields";
import Dialog from "@material-ui/core/Dialog";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { showGraphQLError } from "utils/notifications";
import { injectIntl } from "react-intl";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import { PriceList, AddPriceList } from "./schema/priceList.graphql";

const PriceListSchema = intl => {
  const required = intl.formatMessage({
    id: "common.required",
    defaultMessage: "Required"
  });

  return Yup.object().shape({
    name: Yup.string().required(required),
    type: Yup.string().required(required),
    percentage: Yup.number().when("type", {
      is: "percentage",
      then: Yup.number()
        .moreThan(0)
        .required(),
      otherwise: Yup.number().notRequired()
    })
  });
};

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const PriceListEdit = ({ data, addPriceList, edit, closeModal, intl }) => {
  const classes = useStyles();
  const onHandleSubmit = () => (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    if (edit) {
      console.log("TODO: EDIT");
    } else {
      console.log(": values", values);
      addPriceList({ variables: values })
        .then(() => {
          closeModal();
          resetForm(values);
          setStatus(true);
          setSubmitting(false);
        })
        .catch(err => {
          showGraphQLError(err);
          setStatus({ success: false });
          setSubmitting(false);
        });
    }
  };

  const createOptions = () => [
    {
      value: "amount",
      label: intl.formatMessage({
        id: "priceList.amount",
        defaultMessage: "Amount"
      })
    },
    {
      value: "percentage",
      label: intl.formatMessage({
        id: "priceList.percentage",
        defaultMessage: "Percentage"
      })
    }
  ];

  if (data.loading) {
    return <CircularProgress className={classes.progress} />;
  }

  return (
    <>
      <Dialog
        open
        onClose={() => closeModal()}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
      >
        <Formik
          onSubmit={onHandleSubmit()}
          validationSchema={PriceListSchema(intl)}
          initialValues={{
            type: "amount"
          }}
        >
          {({ values, ...props }) => {
            if (values.type === "amount" && values.percentage !== 0) {
              props.setFieldValue("percentage", 0);
            }
            return (
              <Form
                noValidate
                onSubmit={e => {
                  e.stopPropagation();
                  props.handleSubmit(e);
                }}
              >
                <DialogTitle id="form-dialog-title">
                  {edit
                    ? intl.formatMessage({
                        id: "priceList.edit.header.edit",
                        defaultMessage: "Editing "
                      })
                    : intl.formatMessage({
                        id: "priceList.edit.header.new",
                        defaultMessage: "Create New PriceList"
                      })}
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <Field
                        required
                        id="name"
                        name="name"
                        translation="common.name"
                        label="Name"
                        fullWidth
                        autoComplete="off"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        required
                        id="type"
                        name="type"
                        translation="common.type"
                        label="Type"
                        fullWidth
                        options={createOptions()}
                        autoComplete="off"
                        component={SelectField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        required
                        customsymbol="%"
                        id="percentage"
                        name="percentage"
                        translation="priceList.percentage"
                        label="Percentage"
                        fullWidth
                        type="number"
                        autoComplete="off"
                        component={TextField}
                        value={values.type === "amount" ? 0 : values.percentage}
                        disabled={values.type === "amount"}
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => closeModal()}>
                    {intl.formatMessage({
                      id: "common.cancel",
                      defaultMessage: "Cancel"
                    })}
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={!props.dirty || props.isSubmitting}
                    type="submit"
                  >
                    {edit
                      ? intl.formatMessage({
                          id: "common.edit",
                          defaultMessage: "Edit"
                        })
                      : intl.formatMessage({
                          id: "common.create",
                          defaultMessage: "Create"
                        })}
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </>
  );
};

export default injectIntl(
  compose(
    graphql(PriceList, {
      options: props => ({ variables: { id: props.edit } })
    }),
    graphql(AddPriceList, { name: "addPriceList" })
  )(PriceListEdit)
);
