import { types } from "./actions";

export const initialState = {
  success: false,
  request: false,
  failed: false,
  userEdit: {
    roles: []
  },
  ui: {
    editModal: {
      open: false,
      id: null
    }
  },
  currentUser: {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    enabled: false,
    roles: []
  },
  users: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.currentUserRequest:
      return { ...state, success: false, failure: false, request: true };
    case types.currentUserSuccess:
      return {
        ...state,
        success: true,
        failure: false,
        request: false,
        currentUser: action.payload
      };
    case types.currentUserFailed:
      return { ...state, success: false, failure: true, request: false };

    case types.allUserRequest:
      return { ...state, success: false, failure: false, request: true };
    case types.allUserSuccess:
      return {
        ...state,
        success: true,
        failure: false,
        request: false,
        users: action.payload
      };
    case types.allUserFailed:
      return { ...state, success: false, failure: true, request: false };

    case types.newUserModal:
      return {
        ...state,
        ui: {
          editModal: {
            open: true,
            id: "new"
          }
        }
      };
    case types.editUserModal:
      return {
        ...state,
        ui: {
          editModal: {
            ...state.ui.editModal,
            open: true,
            id: action.payload
          }
        }
      };
    case types.closeUserEditModal:
      return {
        ...state,
        ui: {
          editModal: {
            open: false,
            id: null
          }
        }
      };

    case types.userByIdRequest:
      return {
        ...state,
        success: false,
        request: true,
        failed: false
      };
    case types.userByIdSuccess:
      return {
        ...state,
        success: true,
        request: false,
        failed: false,
        userEdit: action.payload
      };
    case types.userByIdFailed:
      return {
        ...state,
        success: false,
        request: false,
        failed: true
      };

    default:
      return state;
  }
};

export default reducer;
