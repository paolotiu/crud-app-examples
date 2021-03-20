import { ApolloError } from "apollo-server-errors";
import { query } from "./db";
import { Item, Resolvers } from "./generated/graphql";
export const resolvers: Resolvers = {
  Query: {
    allItems: () => {
      const items = query(`
        SELECT * FROM items;
      `);
      console.log(items);
      return [];
    },
  },
  Mutation: {
    createItem: async (_, args) => {
      const { name, price } = args;
      const items = await query<Item>(
        `INSERT INTO items(name, price, category) values ($1, $2, 1)`,
        [name, price]
      );
      if (!items) {
        return {
          name: "Test",
          price: 24190,
          id: "sdojdias",
        };
      }
      const x = items.rows[0];
      return items.rows[0];
    },
  },
};
