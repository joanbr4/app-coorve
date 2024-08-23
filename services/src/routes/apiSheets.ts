import express from "express";
import { pathRoot } from "./routes";
// import { authenticate } from "../middleware/authenticate"
import sheetsController from "../controller/sheetsController";
import { asyncHandler } from "../utils/asyncHandler";
import {
  oauthCallbackController,
  oauthController,
} from "../controller/oAuth2Controller";
// import { stripeController } from "../controller/sessionStripeController"
// import { retrieveController } from "../controller/retriveStripeController"

export const apiRouter = express.Router();

apiRouter.get(pathRoot.v1.google.sheets, asyncHandler(oauthController));
apiRouter.get(
  pathRoot.v1.google.sheets + "/outh2callback",
  asyncHandler(oauthCallbackController)
);

apiRouter.post(
  pathRoot.v1.google.sheets,
  // authenticate,
  asyncHandler(sheetsController)
);

// apiRouter.post(
//   pathRoot.v1.stripe.create_session,
//   asyncHandler(stripeController)
// )
// apiRouter.get(
//   pathRoot.v1.stripe.retrieve_session,
//   asyncHandler(retrieveController)
// )
