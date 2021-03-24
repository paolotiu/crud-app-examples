import { closePool, connectDb, createPool } from "./../db";
import { Client, Pool } from "pg";
import { graphqlTestCall } from "./graphqlTestCall";

let conn: Client | Pool;

beforeAll(async () => {
  conn = createPool({ isTest: true });
  await connectDb({ logQueries: false });
});

afterAll(async () => {
  await conn.query(`
      DROP SCHEMA public CASCADE;
  CREATE SCHEMA public;`);
  await closePool();
});

const createCategoryQuery = `
    mutation createCategoryAndAddItemMutation ($name: String!) {
        createCategory(name: $name ){
            name
        }
    }
`;

const createItemQuery = `
  mutation createItemMutation ($name: String!, $price: Int!){
      createItem(data: {name: $name, price: $price }){
          name
          price 
          id
      }
  }
`;

const getCategoryIdQuery = `
  query getCategoryId ($name: String!) {
      categoryByName(name: $name){
        id
      }
  }
`;
const addItemToCategoryQuery = `
  mutation addItemToCategory ($itemId: ID!, $categoryId: [ID!]!){
      addItemToCategory(itemId: $itemId, categoryId: $categoryId){
        item{
          id
        }
      }
  }
`;

const deleteItemAndCategoryMutation = `
  mutation deleteItemAndCategory ($itemId: ID!, $categoryId: ID!){
    deleteItem(id: $itemId){
      id
    }

    deleteCategory(id: $categoryId){
      id
    }
  }
`;

const updateItemMutation = `  
    mutation updateItem($name: String, $price: Int, $id: ID!){
        updateItem(data: {id: $id, newName: $name, newPrice: $price}){
          name
          id
          price
        }
    }
`;

const updateCategoryMutation = `
    mutation updateCategory($id: ID!, $name: String!){
      updateCategory(data: {id: $id, newName: $name}){
        id
        name
      }
    }
`;

describe("CRUD-ing", () => {
  let iid: string, catId: string;
  const testItem = { name: "Test Item", price: 1000 };
  const testCategory = { name: "TestCategory" };
  test("Creating an item returns the item itself", async () => {
    const res = await graphqlTestCall(createItemQuery, testItem);
    iid = res.data?.createItem.id;
    expect(res.data).toEqual({
      createItem: { name: testItem.name, price: testItem.price, id: iid },
    });
  });

  test("Creating a category return the category itself", async () => {
    const res = await graphqlTestCall(createCategoryQuery, testCategory);
    expect(res.data).toEqual({ createCategory: { name: testCategory.name } });
  });

  test("Adding an item to a category", async () => {
    catId = await graphqlTestCall(getCategoryIdQuery, testCategory).then(
      (res) => res.data?.categoryByName.id
    );
    const res = await graphqlTestCall(addItemToCategoryQuery, {
      itemId: iid,
      categoryId: [catId],
    });
    expect(res.data).toEqual({ addItemToCategory: { item: { id: iid } } });
  });

  test("Updating an item", async () => {
    const updateParams = { id: iid, name: "new name", price: 920 };
    const res = await graphqlTestCall(updateItemMutation, updateParams);
    expect(res.data).toEqual({ updateItem: updateParams });
  });

  test("Updating a category", async () => {
    const updateParams = { id: catId, name: "New cat name" };
    const res = await graphqlTestCall(updateCategoryMutation, updateParams);
    expect(res.data).toEqual({ updateCategory: updateParams });
  });

  test("Bad item update", async () => {
    const badUpdateParams = { name: 29, price: "2", id: iid };
    const res = await graphqlTestCall(updateItemMutation, badUpdateParams);
    expect(res.errors).toBeTruthy();
  });

  test("Deleting the item and category", async () => {
    await graphqlTestCall(deleteItemAndCategoryMutation, {
      itemId: iid,
      categoryId: catId,
    });
    const itemQ = await conn.query(`SELECT * FROM items WHERE id = ${iid}
     `);
    const catQ = await conn.query(
      `SELECT * FROM categories WHERE id = ${catId}`
    );
    expect(itemQ.rows.length).toBe(0);
    expect(catQ.rows.length).toBe(0);
  });
});

describe("Expects bad inputs", () => {});
