import "dotenv/config"
import express from "express"
import { appConfig } from "./config/index.js"

const app = express()
const port = process.env.PORT

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
)
// app.listen(appConfig.port, () =>
//   console.log(`Server is running on http://localhost:${appConfig.port}`)
// )
