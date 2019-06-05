import React from "react";
import { types } from "./actions";

export const initialState = {
  token: null,
  isAuthenticated: false,
  request: false,
  success: false,
  failure: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.mainRequest:
      return { ...state, success: false, failure: false, request: true };
    case types.mainSuccess:
      return {
        ...state,
        success: true,
        failure: false,
        request: false,
        content: action.payload
      };
    case types.mainFailed:
      return { ...state, success: false, failure: true, request: false };
    case types.mainUpdateToken:
      return { ...state, token: action.payload };

    case types.mainLoginRequest:
      return {
        ...state,
        success: false,
        failure: false,
        request: true,
        isAuthenticated: false
      };
    case types.mainLoginSuccess:
      return {
        ...state,
        success: true,
        failure: false,
        request: false,
        isAuthenticated: true,
        email: action.payload.email,
        status: action.payload.status,
        token: action.payload.token
      };
    case types.mainLoginFailed:
      return {
        ...state,
        success: false,
        failure: true,
        request: false,
        isAuthenticated: false
      };

    default:
      return state;
  }
};

export default reducer;
