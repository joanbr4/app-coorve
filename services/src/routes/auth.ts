import express from "express"
import { loginController } from "../controller/auth/loginController.js"
import { registerController } from "../controller/auth/registerController.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { resetPassController } from "../controller/auth/resetPassController.js"
import { authenticate } from "../middleware/authenticate"
import { pathRoot } from "./routes.js"
import { authMeController } from "../controller/auth/meController.js"
import { logoutController } from "../controller/auth/logoutController.js"

export const authRouter = express.Router()

authRouter.post(pathRoot.v1.auth.login, asyncHandler(loginController))
authRouter.post(pathRoot.v1.auth.register, asyncHandler(registerController))
authRouter.post(pathRoot.v1.auth.logout, asyncHandler(logoutController))
authRouter.post(pathRoot.v1.auth.resetPass, asyncHandler(resetPassController))
authRouter.post(
  pathRoot.v1.auth.me,
  asyncHandler(authenticate),
  asyncHandler(authMeController)
)
