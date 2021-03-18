import { Resolvers, Role } from "./generated/graphql";
export const resolvers: Resolvers = {
  Query: {
    helloWorld: () => "Hello World",
    hey: () => Role.Admin,
  },
};
