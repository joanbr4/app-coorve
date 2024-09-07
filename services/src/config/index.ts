import dotenv from "dotenv"
import path from "path"
import z from "zod"

dotenv.config({
  path:
    process.env.NODE_ENV?.trim() === "production" ? ".env.production" : ".env",
  override: true,
})

const appConfigSchema = z
  .object({
    port: z.string(),
    frontend_url: z.string(),
    generateJwtKey: z.string(),
    refreshJwtKey: z.string(),
    generatedJwtExpires: z.string(),
    refreshedJwtExpires: z.string(),
  })
  .strict()

const apiConfigSchema = z
  .object({
    resend: z.string(),
    folder_id: z.string(),
    stripe_key_test: z.string(),
    google_cl_id: z.string(),
    google_cl_secret: z.string(),
    google_redirect_uris: z.string(),
  })

  .strict()

const bcryptConfigSchema = z.object({
  saltRounds: z.number(),
})
const dbConfigSchema = z.object({
  urlSQLite: z.string(),
  urlDrizzle: z.string(),
  turso_token: z.string(),
  turso_database: z.string(),
})

const appConfig = appConfigSchema.parse({
  port: process.env.PORT ?? "4000",
  frontend_url: process.env.DOCKER_FE ?? process.env.FRONTEND_URL,
  generateJwtKey: process.env.GENERATE_JWT_KEY,
  refreshJwtKey: process.env.REFRESH_JWT_KEY,
  generatedJwtExpires: process.env.GENERATED_JWT_EXPIRATION,
  refreshedJwtExpires: process.env.REFRESHED_JWT_EXPIRATION,
})

const apiConfig = apiConfigSchema.parse({
  resend: process.env.API_KEY_RESEND,
  folder_id: process.env.FOLDER_ID,
  stripe_key_test: process.env.API_STRIPE_TEST,
  google_cl_id: process.env.GOOGLE_CLIENT_ID,
  google_cl_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_redirect_uris: process.env.GOOGLE_REDIRECT_URIS,
})

const dbConfig = dbConfigSchema.parse({
  urlSQLite: process.env.URL_TO_SQLITE ?? "",
  urlDrizzle: process.env.URL_TO_DRIZZLE ?? "",
  turso_database: process.env.TURSO_DATABASE_URL,
  turso_token: process.env.TURSO_AUTH_TOKEN,
})

const bcryptConfig = bcryptConfigSchema.parse({
  saltRounds: 10,
})

export { appConfig, bcryptConfig, dbConfig, apiConfig }
