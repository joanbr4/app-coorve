import "dotenv/config"
import z from "zod"

const appConfigSchema = z
  .object({
    port: z.string(),
  })
  .strict()

const dbConfigSchema = z.object({
  host: z.string(),
  port: z.string(),
  database: z.string(),
  user: z.string(),
  passaword: z.string(),
})

const appConfig = appConfigSchema.parse({
  port: process.env.PORT,
})

const dbConfig = dbConfigSchema.parse({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

const bcryptConfig = {
  saltRounds: 8,
}

export { appConfig, bcryptConfig, dbConfig }
