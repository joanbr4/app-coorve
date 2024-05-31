import "dotenv/config"
import express from "express"
import { appConfig } from "./config/index"
import { pathRoot } from "./routes/routes.js"
import { authRouter } from "./routes/auth.js"
import cors from "cors"
import { errorMiddlewareAfter } from "./middleware/errorMiddleware"
// import { client } from "./db/client"

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(pathRoot.v1.auth, authRouter)

app.use(errorMiddlewareAfter)

app.listen(appConfig.port, () =>
  console.log(`Server is running on http://localhost:${appConfig.port}`)
)

// client
//   .connect()
//   .then(() =>
//     app.listen(appConfig.port, () =>
//       console.log(`Server is running on http://localhost:${appConfig.port}`)
//     )
//   )
