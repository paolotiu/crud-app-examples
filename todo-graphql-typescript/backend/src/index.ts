import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/schema";
import express from "express";
import { connectDb } from "./db";

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await connectDb();
  app.listen(4000, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });

  server.applyMiddleware({ app, path: "/graphql" });
};

startServer();
