import { Request, Response } from "express"
import { db } from "../../db/client"
import { users } from "../../db/schemas"
import { eq } from "drizzle-orm"

const authMeController = async (req: Request, res: Response) => {
  const { id } = req.body
  console.log("íd_body", id)
  const dataUser = await db.select().from(users).where(eq(users.id, id))
  const user = dataUser[0]
  console.log("from meController", user)

  const { name, apellidos, email, genere, created_at } = user
  const safeUser = { name, apellidos, email, genere, created_at }
  res.status(200).send(safeUser)
}

export { authMeController }
