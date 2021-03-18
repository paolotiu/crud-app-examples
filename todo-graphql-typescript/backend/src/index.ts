import { resolvers } from "./resolvers";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./schema/schema";
import logger from "morgan";
import express from "express";

const app = express();
console.log(typeDefs.definitions.map((x) => (x as any).name));
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.applyMiddleware({ app, path: "/Someother" });

app.listen(4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
