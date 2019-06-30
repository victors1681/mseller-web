import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField, Checkbox } from "utils/FormFields";
import Dialog from "@material-ui/core/Dialog";
import { compose, graphql } from "react-apollo";
import { makeStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { injectIntl } from "react-intl";
import { Form, Formik, Field } from "formik";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { showGraphQLError, showSuccess } from "utils/notifications";
//import * as Yup from "yup";
import DropZone from "components/common/DropZone";
import TaxDropDown from "components/Taxes/TaxDropDown";
import PriceMultiField from "./PriceMultiField";
import InventorySection from "./InventorySection";
import {
  UpdateProduct,
  ProductById,
  AddProduct,
  UploadImage
} from "./schema/products.graphql";

const ProductSchema = () => {
  // const required = intl.formatMessage({
  //   id: "common.required",
  //   defaultMessage: "Required"
  // });
  // const onlyNumber = intl.formatMessage({
  //   id: "common.onlyNumbers",
  //   defaultMessage: "Only numbers are allowed"
  // });
  // return Yup.object().shape({
  //   code: Yup.string().required(required),
  //   name: Yup.string().required(required),
  //   price1: Yup.number().required(onlyNumber),
  // });
};
const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  paddingBottom: {
    paddingBottom: "0px"
  },
  grid: {
    marginBottom: "21px"
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ProductEdit = ({
  closeModal,
  edit,
  data,
  addNewProduct,
  updateProduct,
  reFetchProductList,
  uploadImage,
  intl
}) => {
  const [images, setImages] = useState();

  const handleImages = imgs => setImages(imgs);

  const classes = useStyles();
  const dataProduct = data && data.product;

  const onHandleSubmit = () => (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    values = {
      ...values,
      price: [
        {
          idPriceList: "123123",
          price: values.price1,
          name: "general"
        },
        {
          idPriceList: "23423324",
          price: values.price2,
          name: "Distributor"
        }
      ]
    };

    //Perform Login
    if (edit) {
      updateProduct({
        variables: { id: edit, ...values }
      })
        .then(result => {
          resetForm(values);
          showSuccess(`${result.data.updateProduct} `);
          setStatus(true);
          closeModal();
        })
        .catch(err => {
          showGraphQLError(err);
          setStatus({ success: false });
          setSubmitting(false);
        });
    } else {
      addNewProduct({
        variables: { ...values, images }
      })
        .then(result => {
          Object.keys(values).forEach(
            key =>
              (values[key] =
                typeof values[key] === "string"
                  ? ""
                  : typeof values[key] === "boolean"
                  ? true
                  : typeof values[key] === "number"
                  ? 0
                  : "")
          );
          resetForm(values);
          showSuccess(result.data.addProduct);
          setStatus(true);
          reFetchProductList();
        })
        .catch(err => {
          showGraphQLError(err);
          setStatus({ success: false });
          setSubmitting(false);
        });
    }
  };

  if (data.loading && !dataProduct) {
    return <CircularProgress className={classes.progress} />;
  }

  return (
    <React.Fragment>
      <Dialog
        open
        onClose={() => closeModal()}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
      >
        <Formik
          onSubmit={onHandleSubmit()}
          validationSchema={ProductSchema(intl)}
          initialValues={{
            ...dataProduct,
            price: [{ idPriceList: "zGDBA2_ra", price: 33 }],
            tax: ["none"],
            warehouses: [
              { id: "peLhWBEUC", name: "test2", initialQuantity: 22 },
              { id: "AvL9bPiey", name: "test2", initialQuantity: 5 }
            ],
            status: edit ? dataProduct.status : true
          }}
        >
          {props => (
            <Form
              noValidate
              onSubmit={e => {
                e.stopPropagation();
                props.handleSubmit(e);
              }}
            >
              <DialogTitle id="form-dialog-title">
                {edit
                  ? intl.formatMessage(
                      {
                        id: "product.edit.header.edit",
                        defaultMessage: "Editing {productCode}"
                      },
                      { productCode: dataProduct.code }
                    )
                  : intl.formatMessage({
                      id: "product.edit.header.new",
                      defaultMessage: "Create New Product"
                    })}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={2}>
                    <Field
                      required
                      id="code"
                      name="code"
                      translation="common.code"
                      label="Code"
                      fullWidth
                      autoComplete="off"
                      component={TextField}
                      disabled={!!edit}
                    />
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <Field
                      required
                      id="name"
                      name="name"
                      translation="common.name"
                      label="Name"
                      fullWidth
                      autoComplete="cname"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <PriceMultiField {...props} />
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <TaxDropDown {...props} />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Field
                      fullWidth
                      name="barCode"
                      label="UPC - EAN Code"
                      translation="common.barCode"
                      id="barCode"
                      autoComplete="false"
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Field
                      id="classification"
                      name="classification"
                      translation="client.edit.classification"
                      label="Classification"
                      fullWidth
                      autoComplete="off"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <InventorySection {...props} />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Field id="status" name="status" component={Checkbox} />
                      }
                      label={intl.formatMessage({
                        id: "common.active",
                        defaultMessage: "Active"
                      })}
                    />
                  </Grid>
                  <DropZone
                    mutation={uploadImage}
                    handleImages={handleImages}
                  />
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
                  disabled={
                    !props.dirty || props.isSubmitting //|| !props.isValid
                  }
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
          )}
        </Formik>
      </Dialog>
    </React.Fragment>
  );
};

export default injectIntl(
  compose(
    graphql(ProductById, {
      options: props => ({ variables: { code: props.edit } })
    }),
    graphql(AddProduct, { name: "addNewProduct" }),
    graphql(UpdateProduct, { name: "updateProduct" }),
    graphql(UploadImage, { name: "uploadImage" })
  )(ProductEdit)
);
