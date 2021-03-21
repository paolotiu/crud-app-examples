import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    allItems: [Item]!
    item(id: ID!): Item
    category(name: String!): Category
  }
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

  type Mutation {
    createItem(name: String!, price: Int!): Item!
    createCategory(name: String!): Category
    addItemToCategory(itemId: ID!, categoryId: ID!): ItemAndCategory
    removeItemFromCategory(itemId: ID!, categoryId: ID!): Item
  }
`;
