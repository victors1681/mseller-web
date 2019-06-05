import { createActions } from "utils/actionHelpers";

export const types = {
  rolesRequest: "ROLES_REQUEST",
  rolesSuccess: "ROLES_SUCCESS",
  rolesFailed: "ROLES_FAILED",

  createRoleRequest: "CREATE_ROLE_REQUEST",
  createRoleSuccess: "CREATE_ROLE_SUCCESS",
  createRoleFailed: "CREATE_ROLE_FAILED",

  updateRoleRequest: "UPDATE_ROLE_REQUEST",
  updateRoleSuccess: "UPDATE_ROLE_SUCCESS",
  updateRoleFailed: "UPDATE_ROLE_FAILED",

  deleteRoleRequest: "DELETE_ROLE_REQUEST",
  deleteRoleSuccess: "DELETE_ROLE_SUCCESS",
  deleteRoleFailed: "DELETE_ROLE_FAILED"
};

export const actions = {
  ...createActions("onGetRoles", [
    types.rolesRequest,
    types.rolesSuccess,
    types.rolesFailed
  ]),
  ...createActions("oncreateRole", [
    types.createRoleRequest,
    types.createRoleSuccess,
    types.createRoleFailed
  ]),
  ...createActions("onUpdateRole", [
    types.updateRoleRequest,
    types.updateRoleSuccess,
    types.updateRoleFailed
  ]),
  ...createActions("onDeleteRole", [
    types.deleteRoleRequest,
    types.deleteRoleSuccess,
    types.deleteRoleFailed
  ])
};

export default actions;
