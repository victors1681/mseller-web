import ApolloClient from "apollo-boost";
// import { InMemoryCache } from "apollo-cache-inmemory";

const client = () =>
  new ApolloClient({
    uri: "https://mseller-api.victors1681.now.sh",
    // cache: new InMemoryCache(),
    headers: {
      authorization: `bearer ${localStorage.getItem("token")}`,
      "client-name": "MSeller [web]",
      "client-version": "1.0.0"
    }
  });

export default client;
