import React, { useReducer } from "react";
import MainReducer, { initialState } from "components/main/container/reducer";
import UserReducer, {
  initialState as userInitialState
} from "components/user/container/reducer";
import RolesReducer, {
  initialState as rolesInitialState
} from "components/roles/container/reducer";
import mainPerformances from "components/main/container/performances";
import userPerformances from "components/user/container/performances";
import rolesPerformances from "components/roles/container/performances";
import combineReducers from "../utils/combineReducers";

const stateCombined = {
  main: initialState,
  user: userInitialState,
  roles: rolesInitialState
};

const rootReducer = combineReducers({
  main: MainReducer,
  user: UserReducer,
  roles: RolesReducer
});

export const initMain = () => {
  const [state, dispatch] = useReducer(rootReducer, stateCombined);

  return {
    ...state,
    main: { ...state.main, ...mainPerformances(dispatch, state) },
    user: { ...state.user, ...userPerformances(dispatch, state) },
    roles: { ...state.roles, ...rolesPerformances(dispatch, state) }
  };
};

const MainContext = React.createContext(initialState);
export default MainContext;
