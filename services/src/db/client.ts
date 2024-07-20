import { dbConfig } from "../config/index";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: dbConfig.urlDrizzle,
});

export const db = drizzle(client);
