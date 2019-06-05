import axios from "axios";

const restClient = axios.create();

export const configureRestClient = (baseURL, csrfToken) => {
  // Base API path
  restClient.defaults.baseURL = baseURL;
  // Add our CSRF header
  restClient.interceptors.request.use(config => {
    const newConfig = { ...config };

    if (csrfToken) {
      if (/^(post|put|patch|delete|get)$/i.test(config.method)) {
        newConfig.headers["Authorization"] = `Bearer ${csrfToken}`;
      }
    }
    return newConfig;
  });
};

export const setBaseURLofRestClient = baseURL => {
  restClient.defaults.baseURL = baseURL;
};

export default restClient;
