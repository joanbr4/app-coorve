import { Request, Response } from "express"
import { validateUserAndToken } from "../utils/validate"

const tokenController = async (req: Request, res: Response) => {
  const authTokenHeader = req.header("Authorization")
  const authTokenFromCookie = req.cookies.get("authToken")
  const authTokenFromBody = req.body.authToken

  let authToken
  if (authTokenHeader?.startsWith("Bearer ")) {
    authToken = authTokenHeader.slice().replace("Bearer ", "")
  } else {
    authToken = authTokenFromBody ?? authTokenFromCookie
  }

  const refreshToken = req.cookies.get("refreshToken")

  try {
    const user = await validateUserAndToken("auth", authToken)
    res.status(200).send(user)
  } catch (err) {}
}

export { tokenController }
