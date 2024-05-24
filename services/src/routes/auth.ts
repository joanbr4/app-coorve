import express from "express"
import { loginController } from "../controller/auth/loginController.js"
import { registerController } from "../controller/auth/registerController.js"

export const authRouter = express.Router()

authRouter.post("/login", loginController)
authRouter.post("/register", registerController)
