import { dbConfig } from "../config/index";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  // url: dbConfig.urlDrizzle,
  url: dbConfig.turso_database,
  authToken: dbConfig.turso_token,
});
export async function testConnection() {
  try {
    const result = await client.execute("SELECT * from users");
    if (result.rows) {
      console.log("Connection successful");
    }
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

export const db = drizzle(client);
