import React, { useContext } from "react";
import { FormattedNumber } from "react-intl";
import Context from "../../../contexts/CurrencyContext";

const Currency = ({ value }) => {
  const { currency, style } = useContext(Context);
  return <FormattedNumber value={value} currency={currency} style={style} />;
};

export default Currency;
