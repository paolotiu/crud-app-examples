import { addItemToCategory } from "./categoryQueries";
import { Category, Item, UpdateItemInput } from "./../../generated/graphql";
import { query } from "../../db";
import { createVariablesString } from "../createVariablesString";
import { createSetStatement } from "../createSetStatement";
import { UserInputError } from "apollo-server-errors";

// get all items
export const allItems = async () => {
  const queryResult = await query<Item>({
    text: `
    SELECT * FROM items;
    `,
  });
  return queryResult.rows;
};

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

// Get items by id
export const itemsById = async (ids: string[]) => {
  const vars = createVariablesString(ids);
  const queryResult = await query<Item>({
    text: `
        SELECT * FROM items
        WHERE id in (${vars})
        `,
    values: ids,
  });

  return queryResult.rows;
};

// Create item
export const createItem = async (data: {
  name: string;
  price: number;
  categoryId?: string[] | null;
}) => {
  const { name, price, categoryId } = data;
  const queryResult = await query<Item>({
    text: `INSERT INTO items(name, price)  
           values ($1, $2) 
           RETURNING *
          `,

    values: [name, price],
  });

  if (categoryId) {
    addItemToCategory(queryResult.rows[0].id, categoryId);
  }

  return queryResult.rows[0];
};

// Delete item
export const deleteItem = async (id: string) => {
  // Delete all category-item raeltionships
  await query({
    text: `
      DELETE FROM item_in_category 
      WHERE item_id = $1
    `,
    values: [id],
  });

  const queryResult = await query<Item>({
    text: `
      DELETE FROM items
      WHERE id = $1 
      RETURNING *;
    `,
    values: [id],
  });
  return queryResult.rows[0];
};

// Get item(s) by name
export const getItemsByName = async (name: string) => {
  const queryResult = await query<Item>({
    text: `
            SELECT * FROM items
            WHERE name = $1;
        `,
    values: [name],
  });

  return queryResult.rows;
};

// Update item
export const updateItem = async ({
  id,
  newName,
  newPrice,
}: UpdateItemInput) => {
  if (!newName && typeof newPrice === "undefined") {
    throw new UserInputError("Input a new name or price");
  }
  const vals =
    newName && newPrice
      ? [id, newName, newPrice]
      : newName
      ? [id, newName]
      : [id, newPrice];

  const queryResult = await query<Item>({
    text: `
      UPDATE items
      SET ${createSetStatement({ name: newName, price: newPrice }, 2)} 
      WHERE id = $1
      RETURNING *;
    `,
    values: vals,
  });

  return queryResult.rows[0];
};

// Get item categories
export const getItemCategories = async (id: string) => {
  const queryResult = await query<Category>({
    text: `
      SELECT iic.category_id id, c.name
      FROM item_in_category iic
      INNER JOIN categories c on iic.category_id = c.id
      WHERE iic.item_id = $1 
    `,
    values: [id],
  });
  console.log(queryResult.rows);
  return queryResult.rows;
};
