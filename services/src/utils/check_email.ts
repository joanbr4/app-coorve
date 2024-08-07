import { eq } from "drizzle-orm"
import { db } from "../db/client"
import { users } from "../db/schemas"
import { User } from "../schemas/user"

export const getCheckEmail = async (email: string): Promise<User[]> => {
  return await db.select().from(users).where(eq(users.email, email))
}
