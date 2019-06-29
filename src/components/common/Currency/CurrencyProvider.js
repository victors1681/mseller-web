import React from "react";
import CurrencyContext from "../../../contexts/CurrencyContext";

const getCurrencySymbol = (locale, currency) =>
  (0)
    .toLocaleString(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    .replace(/\d/g, "")
    .trim();

const CurrencyProvider = ({ children }) => {
  const currency = localStorage.getItem("currency") || "USD";

  const data = {
    currency, //: "DOP", //"USD",
    style: "currency",
    symbol: getCurrencySymbol("en-US", currency) //dynamic en-US
  };

  // DR
  //IntlProvider locale="es-DO"
  // currency: "DOP"

  //US
  //IntlProvider locale="en-US"
  // currency: "USD"
  return (
    <CurrencyContext.Provider name="Currency Provider" value={data}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
