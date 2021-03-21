import { query } from "./db";
import { Category, Item, Resolvers } from "./generated/graphql";
import { ItemAndCategoryIDs } from "./types/modelTypes";
import {
  addItemToCategory,
  oneCategoryById,
  oneItemById,
} from "./util/queries";

export const resolvers: Resolvers = {
  Category: {
    items: ({ id }) => {
      return [null];
    },
  },
  ItemAndCategory: {
    item: ({ item_id }) => oneItemById(item_id),
    category: ({ category_id }) => oneCategoryById(category_id),
  },
  Query: {
    allItems: async () => {
      const items = await query<Item>(`
        SELECT * FROM items;
      `);

      return items.rows;
    },
    item: async (_, { id }) => oneItemById(id),
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
    addItemToCategory: async (_, { itemId, categoryId }) =>
      addItemToCategory(itemId, categoryId),
  },
};
