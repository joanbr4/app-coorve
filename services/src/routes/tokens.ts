import express from "express"
import { pathRoot } from "./routes"
import { tokenController } from "../controller/tokenController"

export const tokenPath = express.Router()

tokenPath.post(pathRoot.v1.tokens.validate, tokenController)
