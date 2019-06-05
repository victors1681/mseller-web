import actionTypes from "./actions";
import { getRolesApi } from "components/roles/container/api";

const performances = (dispatch, state) => {
  const getRoles = async payload => {
    dispatch(actionTypes.onGetRolesRequest(payload));
    try {
      const response = await getRolesApi();
      dispatch(actionTypes.onGetRolesSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getRoles
  };
};

export default performances;
