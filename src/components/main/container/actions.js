import { createActions } from "utils/actionHelpers";

export const types = {
  mainRequest: "INIT_MAIN_REQUEST",
  mainSuccess: "INIT_MAIN_SUCCESS",
  mainFailed: "INI_MAIN_FAILED",

  mainUpdateToken: "MAIN_UPDATE_TOKEN",

  mainLoginRequest: "MAIN_LOGIN_REQUEST",
  mainLoginSuccess: "MAIN_LOGIN_SUCCESS",
  mainLoginFailed: "MAIN_LOGIN_FAILED",

  main: "MAIN_LOADING"
};

export const actions = {
  ...createActions("onMain", [
    types.mainRequest,
    types.mainSuccess,
    types.mainFailed
  ]),

  onUpdateToken: payload => ({
    type: types.mainUpdateToken,
    payload
  }),
  ...createActions("onLogin", [
    types.mainLoginRequest,
    types.mainLoginSuccess,
    types.mainLoginFailed
  ])
};

export default actions;
