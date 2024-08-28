import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { InvalidCredentials } from "../utils/errors"
import { validateUserAndToken } from "../utils/validate"
import { generateToken } from "../utils/jwtAuth"
import { appConfig } from "../config/index"

async function authenticateGoogle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authTokenHeader = req.header("Authorization")
  const authTokenFromCookie = req.cookies.auth_token_google
  const authTokenFromBody = req.body.auth_token_google

  let authToken
  if (authTokenHeader?.startsWith("Bearer ")) {
    authToken = authTokenHeader.slice().replace("Bearer ", "")
  } else {
    authToken = authTokenFromBody ?? authTokenFromCookie
  }

  const refreshToken = req.cookies.refresh_token_google

  try {
    // const idUser = validateUserAndToken("auth", authToken)
    const token = {
      access_token: authToken,
      refresh_token: refreshToken,
      scope:
        "https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive.metadata.readonly",
      token_type: "Bearer",
      expiry_date: 1724798204525,
    }
    req.body = { token: token }
    next()
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      if (authTokenFromBody || authTokenHeader)
        throw new InvalidCredentials("token has expired")

      const id = validateUserAndToken("refresh", refreshToken)
      const newToken = generateToken(id, "auth")
      req.cookies.set("authToken", newToken, {
        httpOnly: true,
        maxAge: appConfig.generateJwtKey,
      })
    } else {
      throw err
    }
  }
}

export { authenticateGoogle }
