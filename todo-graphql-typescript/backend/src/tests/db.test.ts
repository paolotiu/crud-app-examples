import { closePool, connectDb, createPool } from "./../db";
import { Client, Pool } from "pg";
import { graphqlTestCall } from "./graphqlTestCall";

let conn: Client | Pool;

beforeAll(async () => {
  console.log("connecting");
  conn = createPool(true);
  await connectDb();
});

afterAll(async () => {
  await conn.query(`
      DROP SCHEMA public CASCADE;
  CREATE SCHEMA public;`);
  await closePool();
});

const itemsQuery = `
  query itemsQuery {
    item(id: "2") {
      id
      name
    }
  }
`;

const createItemQuery = `
  mutation createItemMutation {
      createItem(data: {name: "new item", price: 900}){
          name
          price 
      }
  }
`;
const createCategoryQuery = `
    mutation createCategoryMutation ($name: String!) {
        createCategory(name: $name ){
            name
        }
    }
`;
test("Creating an item returns the item itself", async () => {
  const res = await graphqlTestCall(createItemQuery);
  expect(res.data).toEqual({ createItem: { name: "new item", price: 900 } });
});

test("Creating a category return the category itself", async () => {
  const vars = { name: "TEST" };
  const res = await graphqlTestCall(createCategoryQuery, vars);
  expect(res.data).toEqual({ createCategory: { name: "TEST" } });
});
