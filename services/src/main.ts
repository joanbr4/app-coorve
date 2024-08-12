import "dotenv/config"
import express from "express"
import { appConfig } from "./config/index"
import { authRouter } from "./routes/auth.js"
import cors from "cors"
import { errorMiddlewareAfter } from "./middleware/errorMiddleware"
import helmet from "helmet"
import { tokenPath } from "./routes/tokens"
import cookieParser from "cookie-parser"
import { apiRouter } from "./routes/apiSheets"
import { mockRouter } from "./routes/mock"

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
app.use(mockRouter)

app.use(errorMiddlewareAfter)

app.listen(appConfig.port, () =>
  console.log(`Server is running on http://localhost:${appConfig.port}`)
)
