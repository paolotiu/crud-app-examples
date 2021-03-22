import { Resolvers } from "./generated/graphql";
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
    createItem: async (_, { name, price }) => queries.createItem(name, price),
    createCategory: async (_, { name }) => queries.createCategory(name),
    addItemToCategory: async (_, { itemId, categoryId }) =>
      queries.addItemToCategory(itemId, categoryId),

    removeItemFromCategory: async (_, { itemId, categoryId }) =>
      queries.removeItemFromCategory(itemId, categoryId),
    deleteCategory: (_, { id }) => queries.deleteCategory(id),
  },
};
