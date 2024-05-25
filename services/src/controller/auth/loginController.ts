import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { getCheckEmail } from "../../repository"
import { generateToken } from "../../utils/jwtAuth"

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const foundUser = await getCheckEmail(email)

  const user = foundUser[0]
  if (!user) throw new Error("Datos incorrectos")
  const passaword = bcrypt.compare(user.password, password)

  if (!passaword) throw new Error("Datos incorrectos")

  const { name, apellidos, email: Email, genere, created_at } = user
  const safeUser = { name, apellidos, Email, genere, created_at }

  const authTokenUser = generateToken(user.id, "auth")
  const refreshTokenUser = generateToken(user.id, "refresh")

  res.cookie("token", authTokenUser, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "none",
    secure: true,
  })
  res.status(200).send({ user: safeUser, authTokenUser, refreshTokenUser })
}
