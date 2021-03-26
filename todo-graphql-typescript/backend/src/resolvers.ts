import { Resolvers } from "./generated/graphql";
import * as queries from "./util/queries";
import { categoriesById, oneItemById } from "./util/queries";

export const resolvers: Resolvers = {
  Category: {
    items: ({ id }, _, ctx) => ctx.dataLoaders.categoryItemsLoader.load(id),
  },
  ItemAndCategory: {
    item: ({ item_id }) => queries.oneItemById(item_id),
    category: ({ category_id }) => queries.oneCategoryById(category_id),
  },
  Item: {
    categories: async ({ id }) => queries.getItemCategories(id),
  },
  Query: {
    allItems: async () => queries.allItems(),
    item: async (_, { id }) => queries.oneItemById(id),
    itemsByName: async (_, { name }) => queries.getItemsByName(name),
    category: async (_, { id }) => queries.oneCategoryById(id),
    categoryByName: async (_, { name }) => queries.oneCategoryByName(name),
    allCategories: async () => queries.allCategories(),
  },
  Mutation: {
    createItem: async (_, { data }) => queries.createItem(data),
    createCategory: async (_, { name }) => queries.createCategory(name),
    addItemToCategory: async (_, { itemId, categoryId }) => {
      const res = await queries.addItemToCategory(itemId, categoryId);
      const ids = res.reduce<{ itemId: string; categoryIds: string[] }>(
        (prev, curr) => ({
          ...prev,
          categoryIds: [...prev.categoryIds, curr.category_id],
        }),
        { itemId: res[0].item_id, categoryIds: [] }
      );
      const item = await oneItemById(ids.itemId);
      const categories = await categoriesById(ids.categoryIds);
      return { item, categories };
    },

    removeItemFromCategory: async (_, { itemId, categoryId }) =>
      queries.removeItemFromCategory(itemId, categoryId),
    deleteCategory: (_, { id }) => queries.deleteCategory(id),
    deleteItem: (_, { id }) => queries.deleteItem(id),
    updateItem: (_, { data }) => queries.updateItem(data),
    updateCategory: (_, { data }) => queries.updateCategory(data),
  },
};
