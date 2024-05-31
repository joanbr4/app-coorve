// import { pgTable, text, integer, serial, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  apellidos: text("apellidos").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  genere: text("genere").notNull(),
  created_at: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
})

export type UsersT = typeof users.$inferSelect

export const houses = sqliteTable("houses", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("prices").notNull(),
  localitation: text("localitation").notNull(),
  userId: integer("user_id").references(() => users.id),
})
// export const users = pgTable("users", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull(),
//   apellidos: text("apellidos").notNull(),
//   email: text("email").notNull(),
//   password: text("password").notNull(),
//   genere: text("genere").notNull(),
//   created_at: timestamp("created_at").notNull().defaultNow(),
// })

// export type UsersT = typeof users.$inferSelect

// export const houses = pgTable("houses", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
//   description: text("description").notNull(),
//   price: integer("prices").notNull(),
//   localitation: text("localitation").notNull(),
//   userId: integer("user_id").references(() => users.id),
// })
