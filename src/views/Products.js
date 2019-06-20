import React, { useState } from "react";
import Header from "components/Header";
import ProductList from "components/product/ProductList";
import ProductEdit from "components/product/ProductEdit";
import ContentWrapper from "components/common/ContentWrapper";

function Products() {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <ContentWrapper>
      <Header title="List of products" handleNew={handleClick} />
      <ProductList />
      {open && <ProductEdit edit={null} closeModal={closeModal} />}
    </ContentWrapper>
  );
}

export default Products;
