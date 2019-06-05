import axios from "../../../rest-client";

export const getCurrentUserApi = () => axios.get("/user/me", {});

export const getAllusersApi = () => axios.get("/user");
export const creteUserApi = user => axios.post("/user", user);
export const updateUserApi = user => axios.put("/user", user);
export const deleteUserApi = user => axios.delete("/user", user);
export const getUserByIdApi = id => axios.get(`/user?id=${id}`);
export const getUserByEmail = email => axios.get(`/user?email=${email}`);
