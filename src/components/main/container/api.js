import axios from "../../../rest-client";

export const fetchData = async () => {
  const result = await axios.get("/todos/", {});
  return result;
};

const config = {
  headers: { "Content-Type": "multipart/form-data" }
};

export const loginApi = async (email, password) => {
  var bodyFormData = new FormData();
  bodyFormData.set("email", email);
  bodyFormData.set("password", password);

  return await axios.post("/auth/login", bodyFormData, config);
};
