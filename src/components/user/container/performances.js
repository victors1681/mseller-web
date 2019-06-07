import {
  getCurrentUserApi,
  getAllusersApi,
  getUserByIdApi
} from "components/user/container/api";
import actionTypes from "./actions";

const performances = dispatch => {
  const getCurrentUser = async () => {
    dispatch(actionTypes.onGetCurrentUserRequest());
    try {
      const response = await getCurrentUserApi();
      dispatch(actionTypes.onGetCurrentUserSuccess(response.data));
    } catch (error) {
      dispatch(actionTypes.onGetCurrentUserFailed(error));
    }
  };

  const getUsersList = async () => {
    try {
      dispatch(actionTypes.onGetAllUserRequest());
      const response = await getAllusersApi();
      dispatch(actionTypes.onGetAllUserSuccess(response.data.result));
    } catch (error) {
      dispatch(actionTypes.onGetAllUserFailed);
    }
  };

  const onNewUserModal = payload =>
    dispatch(actionTypes.onNewUserModal(payload));

  const onEditUserModal = async ({ id }) => {
    try {
      dispatch(actionTypes.onGetUserByIdRequest());
      const response = await getUserByIdApi(id);
      if (response.data && response.data.result) {
        dispatch(actionTypes.onGetUserByIdSuccess(response.data.result));
        dispatch(actionTypes.onEditUserModal(id));
      }
    } catch (error) {
      dispatch(actionTypes.onGetUserByIdFailed(error));
    }
  };

  const onCloseUserEditModal = payload =>
    dispatch(actionTypes.onCloseUserEditModal(payload));

  return {
    getCurrentUser,
    getUsersList,
    onNewUserModal,
    onEditUserModal,
    onCloseUserEditModal
  };
};

export default performances;
