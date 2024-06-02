import "dotenv/config"
import z from "zod"

const appConfigSchema = z
  .object({
    port: z.string(),
    generateJwtKey: z.string(),
    refreshJwtKey: z.string(),
    generatedJwtExpires: z.string(),
    refreshedJwtExpires: z.string(),
    api_key_resend: z.string(),
  })
  .strict()

const bcryptConfigSchema = z.object({
  saltRounds: z.number(),
})
const dbConfigSchema = z.object({
  urlSQLite: z.string(),
  urlDrizzle: z.string(),
  url: z.string(),
  host: z.string(),
  port: z.string(),
  database: z.string(),
  user: z.string(),
  password: z.string(),
})

const appConfig = appConfigSchema.parse({
  port: process.env.PORT,
  generateJwtKey: process.env.GENERATE_JWT_KEY,
  refreshJwtKey: process.env.REFRESH_JWT_KEY,
  generatedJwtExpires: process.env.GENERATED_JWT_EXPIRATION,
  refreshedJwtExpires: process.env.REFRESHED_JWT_EXPIRATION,
  api_key_resend: process.env.API_KEY_RESEND,
})

const dbConfig = dbConfigSchema.parse({
  urlSQLite: process.env.URL_TO_SQLITE,
  urlDrizzle: process.env.URL_TO_DRIZZLE,
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

const bcryptConfig = bcryptConfigSchema.parse({
  saltRounds: 10,
})

export { appConfig, bcryptConfig, dbConfig }
