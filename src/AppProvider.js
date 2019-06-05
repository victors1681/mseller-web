import React from "react";
import MainContext, { initMain } from "./contexts/MainContext";
import { configureRestClient } from "./rest-client";

const AppProvider = props => {
  const mainState = initMain();
  configureRestClient("/api", mainState.main.token);

  return (
    <MainContext.Provider displayName="Main Provider" value={mainState}>
      {props.children}
    </MainContext.Provider>
  );
};

export default AppProvider;
