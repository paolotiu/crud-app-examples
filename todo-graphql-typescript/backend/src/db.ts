import { checkQueryResult } from "./util/validateQueryResult";
import pg, { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "inventory",
  password: "password",
  port: 5433,
});

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
    "CREATE TABLE IF NOT EXISTS categories( id serial PRIMARY KEY,name text not null);"
  );

  await query(
    "CREATE TABLE IF NOT EXISTS items(id serial PRIMARY KEY, name text not null, price int not null, category int references categories(id) not null);"
  );

  await query(
    `CREATE TABLE IF NOT EXISTS item_in_category(
      item int references items(id),
      category int references categories(id),
      primary key (item, category)
   )`
  );
};

export const connectDb = async () => {
  await pool.connect();

  const oldPoolQuery = pool.query;

  // Log queries
  // @ts-ignore
  pool.query = (
    ...args: [
      queryText: string,
      values: any[],
      callback: (err: Error, result: pg.QueryResult<pg.QueryResultRow>) => void
    ]
  ) => {
    console.log("QUERY", args);
    return oldPoolQuery.apply(pool, args);
  };
  await initiateDb();
  await pool.query("SELECT 1 + 1;");
};
