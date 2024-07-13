import express from "express"
import { pathRoot } from "./routes"
// import { authenticate } from "../middleware/authenticate"
import sheetsController from "../controller/sheetsController"
import { asyncHandler } from "../utils/asyncHandler"
import { stripeController } from "../controller/sessionStripeController"
import { retrieveController } from "../controller/retriveStripeController"

export const apiRouter = express.Router()

apiRouter.post(
  pathRoot.v1.google.sheets,
  // authenticate,
  asyncHandler(sheetsController)
)
apiRouter.post(
  pathRoot.v1.stripe.create_session,
  asyncHandler(stripeController)
)
apiRouter.get(
  pathRoot.v1.stripe.retrieve_session,
  asyncHandler(retrieveController)
)
