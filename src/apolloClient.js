import gql from "graphql-tag";

const { ApolloClient } = require("apollo-client");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { createUploadLink } = require("apollo-upload-client");

const Cache = new InMemoryCache();

const GET_USER_DATA = gql`
  query getMember {
    isLoggedIn @client
  }
`;

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const resolvers = {
  Query: {
    getMember: (_root, _, { cache }) => {
      const { isLoggedIn } = cache.readQuery({
        query: GET_USER_DATA
      });
      return { isLoggedIn };
    }
  }
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: process.env.API_URI,
    headers: {
      authorization: `bearer ${localStorage.getItem("token")}`,
      "client-name": "MSeller [web]",
      "client-version": "1.0.0"
    }
  }),
  resolvers,
  typeDefs
});

const initialStore = {
  isLoggedIn: false
};

Cache.writeData({ data: initialStore });

client.onResetStore(() => Cache.writeData({ data: initialStore }));

export default client;
