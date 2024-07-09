import { Request, Response } from "express"

const logoutController = (req: Request, res: Response) => {
  res.clearCookie("authToken")
  res.clearCookie("refreshToken")
  // res.cookie("authToken", null, {
  //   httpOnly: true,
  //   maxAge: 0,
  // })
  // res.cookie("refreshToken", null, {
  //   httpOnly: true,
  //   maxAge: 0,
  // })
  res.status(200).send({ msg: "Successfully logged out" })
}

export { logoutController }
