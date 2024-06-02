import express from "express"
import { loginController } from "../controller/auth/loginController.js"
import { registerController } from "../controller/auth/registerController.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { resetPassController } from "../controller/auth/resetPassController.js"

export const authRouter = express.Router()

authRouter.post("/login", asyncHandler(loginController))
authRouter.post("/register", asyncHandler(registerController))
authRouter.post("/resetPass/:email", asyncHandler(resetPassController))
