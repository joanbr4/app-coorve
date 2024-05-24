// import { sql } from "@vercel/postgres"
// import { drizzle } from "drizzle-orm/vercel-postgres"
// import { drizzle } from "drizzle-orm/node-postgres"
// import * as schema from "./schemas"
import { dbConfig } from "../config/index"
import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
// import { Client, Pool } from "pg"

const client = createClient({
  url: dbConfig.urlDrizzle,
  // authToken: process.env.TURSO_AUTH_TOKEN!,
})

export const db = drizzle(client)

// export const client = new Pool({
//   host: dbConfig.host,
//   port: Number(dbConfig.port),
//   database: dbConfig.database,
//   user: dbConfig.user,
//   password: dbConfig.password,
// })

// // export const pool = new Pool(client)
// // export const pool = new Pool({
// //   connectionString: dbConfig.url,
// // })
// export const db = drizzle(client)
