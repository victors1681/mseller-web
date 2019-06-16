import React from "react";
import CurrencyContext from "../../../contexts/CurrencyContext";

const CurrencyProvider = ({ children }) => {
  const currency = localStorage.getItem("currency") || "USD";

  const data = {
    currency,
    style: "currency"
  };

  return (
    <CurrencyContext.Provider name="Currency Provider" value={data}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
