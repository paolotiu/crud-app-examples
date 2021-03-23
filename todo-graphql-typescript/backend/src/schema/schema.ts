import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
    items: [Item]!
  }
  type Item {
    id: ID!
    name: String!
    price: Int!
  }

  type ItemAndCategory {
    item: Item
    category: Category
  }

  type OneItemAndCategories {
    item: Item
    categories: [Category]
  }
  type Query {
    allItems: [Item]!
    allCategories: [Category]!
    item(id: ID!): Item
    itemsByName(name: String!): [Item]!
    category(id: ID!): Category
    categoryByName(name: String!): Category
  }

  input CreateItemInput {
    name: String!
    price: Int!
    categoryId: [ID!]
  }

  type Mutation {
    createItem(data: CreateItemInput!): Item!
    deleteItem(id: ID!): Item!
    createCategory(name: String!): Category!
    deleteCategory(id: ID!): Category!
    addItemToCategory(itemId: ID!, categoryId: [ID!]!): OneItemAndCategories
    removeItemFromCategory(itemId: ID!, categoryId: ID!): Boolean!
  }
`;
