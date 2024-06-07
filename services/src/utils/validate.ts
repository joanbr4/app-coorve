import { Request } from "express"
import { pathRoot } from "../routes/routes"
import { DefaultError, InvalidCredentials } from "./errors"
import { ValidateRequest } from "../schemas/ssoAuth"
import { kindtoken, verifyToken } from "./jwtAuth"

export const validate = async (req: Request, data: ValidateRequest) => {
  const fetchSSO = await fetch(pathRoot.v1.tokens.validate, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const { status, ok } = fetchSSO
  const fetchData = await fetchSSO.json()
  if (!ok) {
    req.cookies.set("authToken", null, {
      expires: new Date(0),
      overwrite: true,
    })
    throw new DefaultError(status, fetchData.message)
  }
  return fetchData as ValidateRequest
}
export const validateUserAndToken = (
  keytype: kindtoken,
  token: string
): string => {
  if (!token) throw new InvalidCredentials()
  const { id } = verifyToken(keytype, token)
  // const user = await db.select()
  return id
}
