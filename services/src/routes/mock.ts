import express from "express"
import { pathRoot } from "./routes"
import { mockController } from "../controller/mockController"

const mockRouter = express.Router()

mockRouter.get(pathRoot.v1.mock.mocking, mockController)

export { mockRouter }
