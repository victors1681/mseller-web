import axios from "../../../rest-client";

export const getRolesApi = () => axios.get("/role", {});
export const creteRoleApi = role => axios.post("/role", role);
export const updateRoleApi = role => axios.put("/role", role);
export const deleteRoleApi = role => axios.delete("/role", role);
