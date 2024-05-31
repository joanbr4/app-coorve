import express from "express"
import { loginController } from "../controller/auth/loginController.js"
import { registerController } from "../controller/auth/registerController.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const authRouter = express.Router()

authRouter.post("/login", asyncHandler(loginController))
authRouter.post("/register", asyncHandler(registerController))
authRouter.post("/resetPass", asyncHandler(registerController))
