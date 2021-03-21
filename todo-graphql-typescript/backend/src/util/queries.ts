import { Category, Item } from "./../generated/graphql";
import { query } from "../db";
import { ItemAndCategoryIDs } from "../types/modelTypes";

// Get the item by Id
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

// // Get item(s) by name
// export const itemsByName = async (name: string) => {
//   const queryResult = await query<Item>({
//     text: `
//             SELECT * FROM items
//             WHERE name = $1;
//         `,
//     values: [name],
//   });

//   return queryResult.rows;
// };

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
