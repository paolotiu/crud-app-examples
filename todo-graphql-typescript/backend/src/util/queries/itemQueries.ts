import { Item } from "./../../generated/graphql";
import { query } from "../../db";
import { createVariablesString } from "../createVariablesString";

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
  category?: string | null;
}) => {
  const { name, price, category } = data;
  const queryResult = await query<Item>({
    text: `INSERT INTO items(name, price)  
           values ($1, $2) 
           RETURNING *
          `,

    values: [name, price],
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
