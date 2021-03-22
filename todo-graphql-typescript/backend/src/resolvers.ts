import { query } from "./db";
import { Item, Resolvers } from "./generated/graphql";
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
    allItems: async () => queries.allItems(),
    item: async (_, { id }) => queries.oneItemById(id),
    itemsByName: async (_, { name }) => queries.getItemsByName(name),
    category: async (_, { id }) => queries.oneCategoryById(id),
    categoryByName: async (_, { name }) => queries.oneCategoryByName(name),
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
    createCategory: async (_, { name }) => queries.createCategory(name),
    addItemToCategory: async (_, { itemId, categoryId }) =>
      queries.addItemToCategory(itemId, categoryId),

    removeItemFromCategory: async (_, { itemId, categoryId }) =>
      queries.removeItemFromCategory(itemId, categoryId),
    deleteCategory: (_, { id }) => queries.deleteCategory(id),
  },
};
