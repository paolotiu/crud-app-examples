import { Category, Item } from "./../../generated/graphql";
import { query } from "../../db";
import { ItemAndCategoryIDs } from "../../types/modelTypes";

// get category by Id
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

// get category by name
export const oneCategoryByName = async (name: string) => {
  const queryResult = await query<Category>({
    text: `
        SELECT * FROM categories
        WHERE name = $1
       `,
    values: [name],
  });

  return queryResult.rows[0];
};

// create category
export const createCategory = async (name: string) => {
  const queryResult = await query<Category>({
    text: `
        INSERT INTO categories(name) 
        values ($1)
        RETURNING *
        `,
    values: [name],
  });

  return queryResult.rows[0];
};

// add an item to the category
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

// Ger all items from the category
export const allItemsFromCategory = async (categoryId: string) => {
  const queryResult = await query<Item>(
    {
      text: `
            SELECT * FROM items i 
            WHERE i.id in (
                SELECT ic.item_id FROM item_in_category ic
                WHERE ic.category_id = $1
            );
        `,
    },
    [categoryId]
  );
  return queryResult.rows;
};

// Remove an item from the category
export const removeItemFromCategory = async (
  itemId: string,
  categoryId: string
) => {
  const queryResult = await query({
    text: `
        DELETE FROM item_in_category
        WHERE item_id = $1 and category_id = $2;
    `,
    values: [itemId, categoryId],
  });

  // Return true if a row is affected
  // False if not
  return !!queryResult.rowCount;
};

// Delete a category
export const deleteCategory = async (categoryId: string) => {
  const queryResult = await query<Category>({
    text: `
            DELETE FROM categories
            WHERE id = $1
            RETURNING *;
        `,
    values: [categoryId],
  });

  return queryResult.rows[0];
};
