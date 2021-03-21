import { query } from "./db";
import { Category, Item, Resolvers } from "./generated/graphql";
import { ItemAndCategoryIDs } from "./types/modelTypes";

export const resolvers: Resolvers = {
  Category: {
    items: ({ id }) => {
      return [null];
    },
  },
  ItemAndCategory: {
    item: async ({ item: id }) => {
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
    category: async ({ category: id }) => {
      const queryResult = await query<Category>(
        `
        SELECT * FROM categories
        WHERE id = $1
        `,
        [id]
      );
      return queryResult.rows[0];
    },
  },
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
    category: async (_, args) => {
      const { name } = args;
      const queryResult = await query<Category>(
        `
        SELECT * FROM categories
        WHERE name = $1
       `,
        [name]
      );
      return queryResult.rows[0];
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
    createCategory: async (_, args) => {
      const { name } = args;
      const queryResult = await query<Category>(
        `
        INSERT INTO categories(name) 
        values ($1)
        RETURNING *
        `,
        [name]
      );

      return queryResult.rows[0];
    },
    addItemToCategory: async (_, args) => {
      const { categoryId, itemId } = args;
      const queryResult = await query<ItemAndCategoryIDs>(
        `
        INSERT INTO item_in_category (item, category)
        VALUES ($1, $2)
        RETURNING *
      `,
        [itemId, categoryId]
      );

      return queryResult.rows[0];
    },
  },
};
