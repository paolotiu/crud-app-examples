import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";

import { typeDefs } from "../schema/schema";
import { resolvers } from "../resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const graphqlTestCall = async (query: any, variables?: any) => {
  return graphql(schema, query, undefined, variables);
};
