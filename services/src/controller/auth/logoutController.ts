import { Request, Response } from "express"
import { appConfig } from "../../config"

const logoutController = (req: Request, res: Response) => {
  console.log("logout!")

  // res.clearCookie("auth_token_user")
  // res.clearCookie("refresh_token_user")
  res.clearCookie("refresh_token_google", {
    httpOnly: true,
    expires: new Date(0),
    secure: appConfig.port == "3000" ? false : true, // Only send over HTTPS
    sameSite: "lax",
    path: "/", // Ensure path is root by default
    domain: appConfig.port == "3000" ? "localhost" : "coorve.vercel.app", // Ensure path is root by default
  })

  res.clearCookie("auth_token_google", {
    httpOnly: true,
    expires: new Date(0),
    secure: appConfig.port == "3000" ? false : true, // Only send over HTTPS
    sameSite: "lax",
    path: "/", // Ensure path is root by default
    domain: appConfig.port == "3000" ? "localhost" : "coorve.vercel.app", // Ensure path is root by default
  })

  res.status(200).send({ msg: "Successfully logged out" })
}

export { logoutController }
