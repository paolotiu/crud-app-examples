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
  type Query {
    allItems: [Item]!
    item(id: ID!): Item
    itemsByName(name: String!): [Item]!
    category(name: String!): Category
  }

  type Mutation {
    createItem(name: String!, price: Int!): Item!
    deleteItem(id: ID!): Item!
    createCategory(name: String!): Category
    addItemToCategory(itemId: ID!, categoryId: ID!): ItemAndCategory
    removeItemFromCategory(itemId: ID!, categoryId: ID!): Boolean!
  }
`;
