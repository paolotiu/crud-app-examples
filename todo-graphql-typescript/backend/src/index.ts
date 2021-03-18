import { resolvers } from "./resolvers";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./schema/schema";
import express from "express";

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.applyMiddleware({ app, path: "/graphql" });

app.listen(4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
