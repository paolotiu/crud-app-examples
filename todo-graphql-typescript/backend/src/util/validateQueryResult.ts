import { QueryResult } from "pg";

export const checkQueryResult = async <T>(
  query: Promise<QueryResult<T>> | void
) => {
  const res = await query;
  if (!res) {
    throw new Error("Error in query");
  }
  return res;
};
