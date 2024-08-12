import "dotenv/config"
import express from "express"
import { appConfig } from "../src/config/index"
import { authRouter } from "../src/routes/auth.js"
import cors from "cors"
import { errorMiddlewareAfter } from "../src/middleware/errorMiddleware.js"
import helmet from "helmet"
import { tokenPath } from "../src/routes/tokens.js"
import cookieParser from "cookie-parser"
import { apiRouter } from "../src/routes/apiSheets.js"

const app = express()
app.use(cors())

//Sett http headers appropriately, a collect of small middware
app.use(helmet())
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(authRouter)
app.use(apiRouter)
app.use(tokenPath)

app.use(errorMiddlewareAfter)

app.listen(appConfig.port, () =>
  console.log(`Server is running on http://localhost:${appConfig.port}`)
)

export default app
