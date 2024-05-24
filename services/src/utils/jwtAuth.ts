import { appConfig } from "../config/index"
import jwt, { JwtPayload } from "jsonwebtoken"

export type kindtoken = "auth" | "refresh"

export function generateToken(userId: string, keytype: kindtoken) {
  const key =
    keytype === "auth" ? appConfig.generateJwtKey : appConfig.refreshJwtKey

  const expiresIn =
    key === "auth"
      ? appConfig.generatedJwtExpires
      : appConfig.refreshedJwtExpires

  return jwt.sign({ id: userId }, key, {
    expiresIn,
  })
}

export function verifyToken(keytype: kindtoken, token: string) {
  const secretKey =
    keytype === "auth" ? appConfig.generateJwtKey : appConfig.refreshJwtKey
  return jwt.verify(token, secretKey) as JwtPayload
}

export const generateExpiredToken = (userId: string, keytype: kindtoken) => {
  const key =
    keytype === "auth" ? appConfig.generateJwtKey : appConfig.refreshJwtKey

  const payload = {
    id: userId,
    exp: Math.floor(Date.now() / 1000) - 60 * 60,
  }
  return jwt.sign(payload, key)
}
