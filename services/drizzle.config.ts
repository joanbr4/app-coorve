import { defineConfig } from "drizzle-kit"
import { dbConfig } from "./src/config/index"

export default defineConfig({
  schema: "./src/db/schemas.ts", // any schema file inside the /db folder.
  dialect: "sqlite", // "postgresql" | "mysql" | "sqlite"
  out: "./migrations",
  // driver: "turso", //optional:  aws-data-api |turso | d1-http - currently WIP | expo
  dbCredentials: {
    url: dbConfig.urlDrizzle,
  },
})

//postgres config
// export default {
//   schema: "./src/db/schemas.ts", // any schema file inside the /db folder.
//   dialect: "postgresql", //
//   out: "./drizzle",
//   // driver: "pg",
//   dbCredentials: {
//     url: dbConfig.url,
//   },
// } satisfies Config
