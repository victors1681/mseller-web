import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField, Checkbox } from "utils/FormFields";
import Dialog from "@material-ui/core/Dialog";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
// import * as Yup from "yup";
import DropZone from "components/common/DropZone";

import CategorySelect from "components/Category/CategorySelect";
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
  },
  priceBackground: {
    background: theme.palette.background.default
  },
  bigAvatar: {
    margin: "auto",
    width: 80,
    height: 80
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
      category: {
        id: values.category
      },
      price: [
        {
          idPriceList: "0", // General default
          price: values.defaultPrice,
          name: "general"
        },
        ...values.price
      ],
      tax: values.tax.map(t => ({ id: t })),
      inventory: {
        unit: values.unit,
        // unitCost: values.unitCost,
        // initialQuantity: values.initialQuantity,
        warehouses: values.warehouses
      }
    };

    // Perform Login
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
          // Object.keys(values).forEach(
          //   key =>
          //     (values[key] =
          //       typeof values[key] === "string"
          //         ? ""
          //         : typeof values[key] === "boolean"
          //         ? true
          //         : typeof values[key] === "number"
          //         ? 0
          //         : "")
          // );

          resetForm();
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
    <>
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
            price: [],
            tax: ["none"],
            warehouses: [],
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
                  <Grid item xs={12} sm={8}>
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
                  <Grid item xs={12} sm={2}>
                    {/* <DropZone
                      mutation={uploadImage}
                      handleImages={handleImages}
                    /> */}
                    <Field
                      id="images"
                      name="images"
                      translation="common.name"
                      component={DropZone}
                      uploadImage={uploadImage}
                      handleImages={handleImages}
                    />
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Card>
                        <CardContent>
                          <PriceMultiField {...props} />
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <Card>
                        <CardContent>
                          <CategorySelect {...props} />

                          <Field
                            fullWidth
                            name="barCode"
                            label="UPC - EAN Code"
                            translation="common.barCode"
                            id="barCode"
                            autoComplete="false"
                            component={TextField}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      multiline
                      id="description"
                      name="description"
                      translation="common.description"
                      label="Description"
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
                    !props.dirty || props.isSubmitting // || !props.isValid
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
    </>
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
