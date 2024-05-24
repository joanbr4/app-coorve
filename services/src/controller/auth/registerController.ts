import { Request, Response } from "express"
import { getCheckEmail } from "../../repository"
import { hashPassword } from "../../utils/passwordHash"
import { users } from "../../db/schemas"
import { db } from "../../db/client"
import { generatedId } from "../../utils/cuidGenerator"
// import { user } from "../../schemas/user"

export const registerController = async (req: Request, res: Response) => {
  const { name, apellidos, email, password, genere, created_at } = req.body
  console.log(req.body)
  const foundUser = await getCheckEmail(email)

  const user = foundUser[0]
  if (user) throw new Error("Correo ya existe")

  const passwordCrypt = await hashPassword(password)

  const idGener = generatedId()

  await db.insert(users).values({
    id: idGener,
    name: name,
    apellidos: apellidos,
    email: email,
    password: passwordCrypt,
    genere: genere,
    created_at: created_at,
  })

  res.status(200).send({ idGener })
}
