import { createActions } from "utils/actionHelpers";

export const types = {
  currentUserRequest: "CURRENT_USER_REQUEST",
  currentUserSuccess: "CURRENT_USER_SUCCESS",
  currentUserFailed: "CURRENT_USER_FAILED",

  allUserRequest: "ALL_USER_REQUEST",
  allUserSuccess: "ALL_USER_SUCCESS",
  allUserFailed: "ALL_USER_FAILED",

  createUserRequest: "CREATE_USER_REQUEST",
  createUserSuccess: "CREATE_USER_SUCCESS",
  createUserFailed: "CREATE_USER_FAILED",

  updateUserRequest: "UPDATE_USER_REQUEST",
  updateUserSuccess: "UPDATE_USER_SUCCESS",
  updateUserFailed: "UPDATE_USER_FAILED",

  deleteUserRequest: "DELETE_USER_REQUEST",
  deleteUserSuccess: "DELETE_USER_SUCCESS",
  deleteUserFailed: "DELETE_USER_FAILED",

  userByIdRequest: "USER_BY_ID_REQUEST",
  userByIdSuccess: "USER_BY_ID_SUCCESS",
  userByIdFailed: "USER_BY_ID_FAILED",

  userByEmailRequest: "USER_BY_EMAIL_REQUEST",
  userByEmailSuccess: "USER_BY_EMAIL_SUCCESS",
  userByEmailFailed: "USER_BY_EMAIL_FAILED",

  newUserModal: "NEW_USER_MODAL",
  editUserModal: "EDIT_USER_MODAL",
  closeUserEditModal: "CLOSE_USER_EDIT_MODAL"
};

export const actions = {
  ...createActions("onGetCurrentUser", [
    types.currentUserRequest,
    types.currentUserSuccess,
    types.currentUserFailed
  ]),
  ...createActions("onGetAllUser", [
    types.allUserRequest,
    types.allUserSuccess,
    types.allUserFailed
  ]),
  ...createActions("onCreateUser", [
    types.createUserRequest,
    types.createUserSuccess,
    types.createUserFailed
  ]),
  ...createActions("onUpdateUser", [
    types.updateUserRequest,
    types.updateUserSuccess,
    types.updateUserFailed
  ]),
  ...createActions("onDeleteUser", [
    types.deleteUserRequest,
    types.deleteUserSuccess,
    types.deleteUserFailed
  ]),
  ...createActions("onGetUserById", [
    types.userByIdRequest,
    types.userByIdSuccess,
    types.userByIdFailed
  ]),
  ...createActions("onGetUserByEmail", [
    types.userByEmailRequest,
    types.userByEmailSuccess,
    types.userByEmailFailed
  ]),
  onNewUserModal: payload => ({
    type: types.newUserModal,
    payload
  }),
  onEditUserModal: payload => ({
    type: types.editUserModal,
    payload
  }),
  onCloseUserEditModal: payload => ({
    type: types.closeUserEditModal,
    payload
  })
};

export default actions;
