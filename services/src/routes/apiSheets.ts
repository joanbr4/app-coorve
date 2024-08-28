import express from "express"
import { pathRoot } from "./routes"
import { authenticate } from "../middleware/authenticate"
import sheetsController from "../controller/sheetsController"
import { asyncHandler } from "../utils/asyncHandler"
import {
  oAuth2CallbackController,
  oAuthController,
} from "../controller/auth/auth2Client"
import { authenticateGoogle } from "../middleware/authenticateGoogle"
// import {
//   oauthCallbackController,
//   oauthController,
// } from "../controller/oAuth2Controller";
// import { stripeController } from "../controller/sessionStripeController"
// import { retrieveController } from "../controller/retriveStripeController"

export const apiRouter = express.Router()

apiRouter.get(
  pathRoot.v1.google.sheets,
  authenticateGoogle,
  asyncHandler(sheetsController)
)
apiRouter.get(pathRoot.v1.google.auth, asyncHandler(oAuthController))
apiRouter.get(
  pathRoot.v1.google.callback,
  asyncHandler(oAuth2CallbackController)
)

apiRouter.post(
  pathRoot.v1.google.sheets,
  authenticateGoogle,
  asyncHandler(sheetsController)
)

// apiRouter.post(
//   pathRoot.v1.stripe.create_session,
//   asyncHandler(stripeController)
// )
// apiRouter.get(
//   pathRoot.v1.stripe.retrieve_session,
//   asyncHandler(retrieveController)
// )
