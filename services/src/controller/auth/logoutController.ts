import { Request, Response } from "express"

const logoutController = (req: Request, res: Response) => {
  res.clearCookie("auth_token_user")
  res.clearCookie("refresh_token_user")
  res.clearCookie("refresh_token_google")
  res.clearCookie("auth_token_google")
  res.cookie("refresh_token_google", null, {
    httpOnly: true,
    maxAge: 0,
  })
  res.cookie("auth_token_google", null, {
    httpOnly: true,
    maxAge: 0,
  })

  res.status(200).send({ msg: "Successfully logged out" })
}

export { logoutController }
