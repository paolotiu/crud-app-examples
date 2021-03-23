import { checkQueryResult } from "./util/validateQueryResult";
import pg, { Client, Pool } from "pg";

let pool: Pool | Client;

interface CreatePoolOptions {
  isTest?: boolean;
}

export const createPool = ({ isTest = false }: CreatePoolOptions) => {
  if (isTest) {
    pool = new Client({
      user: "postgres",
      host: "localhost",
      database: "test",
      password: "password",
      port: 5433,
    });
  } else {
    pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "inventory",
      password: "password",
      port: 5433,
    });
  }
  return pool;
};
// export query method to a function
export const query = <ReturnType>(
  textOrQueryConfig: string | pg.QueryConfig,
  params?: any
) => {
  if (params) {
    return checkQueryResult(pool.query<ReturnType>(textOrQueryConfig, params));
  } else {
    // no params
    return checkQueryResult(pool.query<ReturnType>(textOrQueryConfig));
  }
};

// Initiate db if no tables and/or fields are made
const initiateDb = async () => {
  await query(
    "CREATE TABLE IF NOT EXISTS categories( id serial PRIMARY KEY,name text not null unique);"
  );

  await query(
    "CREATE TABLE IF NOT EXISTS items(id serial PRIMARY KEY, name text not null, price int not null );"
  );

  await query(
    `CREATE TABLE IF NOT EXISTS item_in_category(
      item_id int references items(id),
      category_id int references categories(id),
      primary key (item_id, category_id)
   )`
  );
};

interface ConnectDBOptions {
  logQueries?: boolean;
}
export const connectDb = async ({ logQueries = false }: ConnectDBOptions) => {
  await pool.connect();

  if (logQueries) {
    const oldPoolQuery = pool.query;

    // Log queries
    // @ts-ignore
    pool.query = (
      ...args: [
        queryText: string,
        values: any[],
        callback: (
          err: Error,
          result: pg.QueryResult<pg.QueryResultRow>
        ) => void
      ]
    ) => {
      console.log("QUERY", args);
      return oldPoolQuery.apply(pool, args);
    };
  }
  await initiateDb();
  await pool.query("SELECT 1 + 1;");
};

export const closePool = async () => {
  await pool.end();
};
