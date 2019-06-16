import React, { useState } from "react";
import Header from "components/Header";
import ProductList from "components/product/ProductList";
import ProductEdit from "components/product/ProductEdit";

function Products() {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <React.Fragment>
      <Header title="List of products" handleNew={handleClick} />
      <ProductList />
      {open && <ProductEdit edit={null} closeModal={closeModal} />}
    </React.Fragment>
  );
}

export default Products;
