import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    allItems: [Item]!
    item(id: ID!): Item
    category(name: String!): Category
  }
  type Category {
    name: String!
    items: [Item!]!
  }
  type Item {
    id: ID!
    name: String!
    price: Int!
  }

  type Mutation {
    createItem(name: String!, price: Int!): Item!
    createCategory(name: String!): Category
  }
`;
