import { query } from "./db";
import { Item, Resolvers } from "./generated/graphql";

export const resolvers: Resolvers = {
  Query: {
    allItems: async () => {
      const items = await query<Item>(`
        SELECT * FROM items;
      `);

      return items.rows;
    },
    item: async (_, args) => {
      const { id } = args;
      const queryResult = await query<Item>(
        `
      SELECT * FROM items
      WHERE id = $1
      `,
        [id]
      );
      const item = queryResult.rows[0];

      return item;
    },
  },
  Mutation: {
    createItem: async (_, args) => {
      const { name, price } = args;
      const items = await query<Item>(
        `INSERT INTO items(name, price, category) 
           values ($1, $2, 1) 
           RETURNING *
          `,
        [name, price]
      );

      return items.rows[0];
    },
  },
};
