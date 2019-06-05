import axios from "../rest-client";

export const sendText = async (text, user) => {
  const result = await axios.post("/chat", { text, user });
  return result;
};

export const endChat = async (values, user) => {
  const payload = { text: `/endchat/${JSON.stringify(values)}`, user };
  const result = await axios.post("/chat", payload);
  return result;
};
