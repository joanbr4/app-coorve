import { Request, Response } from "express"
import { getCheckEmail } from "../../repository"
import { hashPassword } from "../../utils/passwordHash"
import { users } from "../../db/schemas"
import { db } from "../../db/client"
import { generatedId } from "../../utils/cuidGenerator"
import { DuplicateError, NotFoundError } from "../../utils/errors"

export const registerController = async (req: Request, res: Response) => {
  console.log("asdsa", req.body)
  const {
    name,
    surname: apellidos,
    email,
    password,
    genere,
    created_at,
  } = req.body

  if (req.body == undefined) {
    throw new NotFoundError("Faltan datos")
  }

  const foundUser = await getCheckEmail(email)
  const user = foundUser[0]

  if (user) throw new DuplicateError("Email")
  else {
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

    res.status(200).json({ message: "User created successfully", idGener })
  }
}
