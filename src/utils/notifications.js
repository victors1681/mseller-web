import { toast } from "react-toastify";

export const showSuccess = msg => toast.success(msg);
export const showGraphQLError = ({ graphQLErrors }) => {
  graphQLErrors.forEach(element => {
    toast.error(element.message);
  });
};

export default toast;
