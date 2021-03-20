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
  text: string,
  params?: any,
  cb?: (err: Error, result: pg.QueryResult<any>) => void
) => {
  if (cb) {
    return pool.query(text, params, cb);
  } else {
    if (params) {
      return pool.query<ReturnType>(text, params);
    } else {
      // no params
      return pool.query<ReturnType>(text);
    }
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
