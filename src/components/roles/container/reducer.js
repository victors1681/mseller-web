import { types } from "./actions";

export const initialState = {
  success: false,
  failure: false,
  request: false,
  content: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.rolesRequest:
      return { ...state, success: false, failure: false, request: true };
    case types.rolesSuccess:
      return {
        ...state,
        success: true,
        failure: false,
        request: false,
        content: action.payload
      };
    case types.rolesFailed:
      return { ...state, success: false, failure: true, request: false };

    default:
      return state;
  }
};

export default reducer;
