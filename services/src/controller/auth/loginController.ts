import { Request, Response } from "express"
import { getCheckEmail } from "../../repository"
import { generateToken } from "../../utils/jwtAuth"
import { InvalidCredentials } from "../../utils/errors"
import { checkPassword } from "../../utils/passwordHash"

export const loginController = async (req: Request, res: Response) => {
  const { email: Email, password } = req.body
  const expirationInMilliseconds = 86400000
  const foundUser = await getCheckEmail(Email)

  const user = foundUser[0]
  if (!user) throw new InvalidCredentials()

  const passaword = checkPassword(password, user.password)
  if (!passaword) throw new InvalidCredentials()

  const { name, apellidos, email, genere, created_at } = user
  const safeUser = { name, apellidos, email, genere, created_at }

  const authTokenUser = generateToken(user.id, "auth")
  const refreshTokenUser = generateToken(user.id, "refresh")

  res.cookie("authToken", authTokenUser, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "none",
    secure: true,
  })
  res.cookie("refreshToken", refreshTokenUser, {
    httpOnly: true,
    maxAge: expirationInMilliseconds,
  })

  res.status(200).send({ user: safeUser, authTokenUser, refreshTokenUser })
}
