import { getRolesApi } from "components/roles/container/api";
import actionTypes from "./actions";

const performances = dispatch => {
  const getRoles = async payload => {
    dispatch(actionTypes.onGetRolesRequest(payload));
    try {
      const response = await getRolesApi();
      dispatch(actionTypes.onGetRolesSuccess(response.data));
    } catch (error) {
      dispatch(actionTypes.onGetRolesFailed(error));
    }
  };

  return {
    getRoles
  };
};

export default performances;
