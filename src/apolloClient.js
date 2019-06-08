import ApolloClient, { InMemoryCache } from "apollo-boost";
import gql from "graphql-tag";

const cache = new InMemoryCache();

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

      console.error("DATAAAA IS", isLoggedIn);
      return { isLoggedIn };
    }
  }
};

const client = new ApolloClient({
  uri: "https://mseller-api.victors1681.now.sh/",
  cache,
  resolvers,
  typeDefs
});

const initialStore = {
  isLoggedIn: false
};

cache.writeData({ data: initialStore });

client.onResetStore(() => cache.writeData({ data: initialStore }));

export default client;
