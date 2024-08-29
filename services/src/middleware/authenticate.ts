import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { InvalidCredentials } from "../utils/errors"
import { validateUserAndToken } from "../utils/validate"
import { generateToken } from "../utils/jwtAuth"
import { appConfig } from "../config/index"

async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authTokenHeader = req.header("Authorization")
  const authTokenFromCookie = req.cookies.auth_token_user
  const authTokenFromBody = req.body.auth_token_user
  console.log("authTokenBody", authTokenFromBody)
  console.log("authTokenCookie", authTokenFromCookie)
  let authToken
  if (authTokenHeader?.startsWith("Bearer ")) {
    authToken = authTokenHeader.slice().replace("Bearer ", "")
  } else {
    authToken = authTokenFromBody ?? authTokenFromCookie
  }

  const refreshToken = req.cookies.refresh_token_user

  try {
    const idUser = validateUserAndToken("auth", authToken)
    req.body = { id: idUser }
    next()
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      if (authTokenFromBody || authTokenHeader)
        throw new InvalidCredentials("token has expired")

      const id = validateUserAndToken("refresh", refreshToken)
      const newToken = generateToken(id, "auth")
      req.cookies.set("auth_token_user", newToken, {
        httpOnly: true,
        maxAge: appConfig.generateJwtKey,
      })
    } else {
      throw err
    }
  }
}

export { authenticate }
