import { toast } from "react-toastify";

export const showSuccess = msg => toast.success(msg);
export const showGraphQLError = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors && graphQLErrors.length) {
    graphQLErrors.forEach(element => {
      toast.error(element.message);
    });
  }

  if (networkError && networkError.result.errors.length) {
    networkError.result.errors.forEach(element => {
      toast.error(element.message, { autoClose: 10000 });
    });
  }
};

export default toast;
