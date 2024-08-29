import { Request, Response } from "express"
import { getCheckEmail } from "../../utils/check_email"
import { generateToken } from "../../utils/jwtAuth"
import { InvalidCredentials } from "../../utils/errors"
import { checkPassword } from "../../utils/passwordHash"

export const loginController = async (req: Request, res: Response) => {
  const { email: Email, password } = req.body
  const foundUser = await getCheckEmail(Email)

  const user = foundUser[0]
  if (!user) throw new InvalidCredentials()

  const isValidPassword = await checkPassword(password, user.password)
  if (!isValidPassword) throw new InvalidCredentials()

  const { name, apellidos, email, genere, created_at } = user
  const safeUser = { name, apellidos, email, genere, created_at }

  const authTokenUser = generateToken(user.id, "auth")
  const refreshTokenUser = generateToken(user.id, "refresh")
  console.log("auth:", authTokenUser)
  console.log("refresh: ", refreshTokenUser)

  res.cookie("auth_token_user", authTokenUser, {
    maxAge: 1000 * 60 * 60 * 24, //1d
    httpOnly: true,
    secure: true, // Only send over HTTPS, so in production
    sameSite: "strict",
    // path: "/", // Ensure path is root by default
  })
  res.cookie("refresh_token_user", refreshTokenUser, {
    httpOnly: true,
    secure: true, // Only send over HTTPS
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7, //7d
    // path: "/", // Ensure path is root by default
  })

  console.log("Validation user successful!")

  res.status(200).send({ user: safeUser, authTokenUser, refreshTokenUser })
}
