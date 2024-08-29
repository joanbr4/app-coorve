import { Request, Response } from "express"

const logoutController = (req: Request, res: Response) => {
  console.log("logout!")

  res.clearCookie("auth_token_user")
  res.clearCookie("refresh_token_user")
  res.clearCookie("auth_token_google", {
    path: "/",
  })
  res.clearCookie("refresh_token_google", {
    path: "/",
  })

  res.status(200).send({ msg: "Successfully logged out" })
}

export { logoutController }
