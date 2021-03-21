import { query } from "./db";
import { Category, Item, Resolvers } from "./generated/graphql";
import { ItemAndCategoryIDs } from "./types/modelTypes";
import * as queries from "./util/queries";

export const resolvers: Resolvers = {
  Category: {
    items: ({ id }) => queries.allItemsFromCategory(id),
  },
  ItemAndCategory: {
    item: ({ item_id }) => queries.oneItemById(item_id),
    category: ({ category_id }) => queries.oneCategoryById(category_id),
  },
  Query: {
    allItems: async () => {
      const items = await query<Item>(`
        SELECT * FROM items;
      `);

      return items.rows;
    },
    item: async (_, { id }) => queries.oneItemById(id),
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
    itemsByName: async (_, { name }) => queries.getItemsByName(name),
  },
  Mutation: {
    createItem: async (_, args) => {
      const { name, price } = args;
      const items = await query<Item>(
        `INSERT INTO items(name, price)  
           values ($1, $2) 
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
      queries.addItemToCategory(itemId, categoryId),

    removeItemFromCategory: async (_, { itemId, categoryId }) =>
      queries.removeItemFromCategory(itemId, categoryId),
    deleteCategory: (_, { id }) => queries.deleteCategory(id),
  },
};
