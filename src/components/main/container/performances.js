import { fetchData, loginApi } from "components/main/container/api";
import { getCurrentUserApi } from "components/user/container/api";
import { getRolesApi } from "components/roles/container/api";

import userActions from "components/user/container/actions";
import rolesActions from "components/roles/container/actions";
import actionTypes from "./actions";

const performances = dispatch => {
  const onInitMain = async payload => {
    dispatch(actionTypes.onMainRequest(payload));
    try {
      const response = await fetchData();
      setTimeout(() => {
        //Simulating loading....
        dispatch(actionTypes.onMainSuccess(response.data));
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  const onLogin = async payload => {
    try {
      dispatch(actionTypes.onLoginRequest(payload));
      const { email, password } = payload;
      const response = await loginApi(email, password);

      if (response && response.data && response.data.status === "success") {
        dispatch(actionTypes.onLoginSuccess(response.data));

        //Ger user data
        const [currentUser, roles] = await Promise.all([
          getCurrentUserApi(),
          getRolesApi()
        ]);
        if (currentUser && currentUser.data && roles && roles.data) {
          dispatch(
            userActions.onGetCurrentUserSuccess(currentUser.data.result)
          );
          dispatch(rolesActions.onGetRolesSuccess(roles.data.result));
        }
      } else {
        dispatch(actionTypes.onLoginFailed(response.data));
      }
    } catch (errr) {
      dispatch(actionTypes.onLoginFailed("error"));
    }
  };

  return {
    onInitMain,
    onLogin
  };
};

export default performances;
