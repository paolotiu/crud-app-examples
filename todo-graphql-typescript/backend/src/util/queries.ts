import { Category, Item } from "./../generated/graphql";
import { query } from "../db";
import { ItemAndCategoryIDs } from "../types/modelTypes";

export const oneItemById = async (id: string) => {
  const queryResult = await query<Item>({
    text: `
      SELECT * FROM items
      WHERE id = $1
      `,
    values: [id],
  });

  return queryResult.rows[0];
};

export const oneCategoryById = async (id: string) => {
  const queryResult = await query<Category>({
    text: `
            SELECT * FROM categories
            WHERE id = $1
        `,
    values: [id],
  });
  return queryResult.rows[0];
};

export const addItemToCategory = async (itemId: string, categoryId: string) => {
  const queryResult = await query<ItemAndCategoryIDs>({
    text: `
        INSERT INTO item_in_category (item_id, category_id)
        VALUES ($1, $2)
        RETURNING *;
    `,
    values: [itemId, categoryId],
  });

  return queryResult.rows[0];
};
