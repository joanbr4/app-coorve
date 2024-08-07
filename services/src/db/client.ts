import { dbConfig } from "../config/index"
import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"

const client = createClient({
  // url: dbConfig.urlDrizzle,
  url: dbConfig.turso_database,
  // authToken: dbConfig.turso_token,
})

export const db = drizzle(client)
