import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/schema";
import express from "express";
import { connectDb, createPool } from "./db";
import compression from "compression";
import DataLoader from "dataloader";
import { allItemsFromCategory } from "./util/queries";

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      dataLoaders: {
        categoryItemsLoader: new DataLoader(async (keys) => {
          const items = await allItemsFromCategory(keys as string[]);

          // Create a map for the items
          const itemsMap: { [key: string]: any[] } = {};
          items.forEach((item) => {
            if (itemsMap[item.category_id]) {
              itemsMap[item.category_id].push(item);
            } else {
              itemsMap[item.category_id] = [item];
            }
          });

          // return an array of array of items or empty array
          // ex. [[item1, item4], [item3], [item2], []]
          return (keys as string[]).map((key) => itemsMap[key] || []);
        }),
      },
    },
    tracing: true,
  });
  createPool();
  await connectDb();

  app.use(compression());
  server.applyMiddleware({ app, path: "/graphql" });
  app.listen(4000, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
};

startServer();
