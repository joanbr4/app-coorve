import express from "express"
import { pathRoot } from "./routes"
import { authenticate } from "../middleware/authenticate"
import sheetsController from "../controller/sheetsController"
import { asyncHandler } from "../utils/asyncHandler"

export const apiRouter = express.Router()

apiRouter.post(
  pathRoot.v1.google.sheets,
  // authenticate,
  asyncHandler(sheetsController)
)
