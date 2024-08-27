import "dotenv/config";
import express from "express";
import { appConfig } from "./config/index";
import { authRouter } from "./routes/auth.js";
import cors from "cors";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import helmet from "helmet";
import { tokenPath } from "./routes/tokens.js";
import cookieParser from "cookie-parser";
import { apiRouter } from "./routes/apiSheets.js";
import { mockRouter } from "./routes/mock.js";

const app = express();

app.use(
  cors({
    origin: appConfig.frontend_url,
    credentials: true,
  })
);
console.error("url-fe:", appConfig.frontend_url);

//Sett http headers appropriately, a collect of small middware
app.use(helmet());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(apiRouter);
app.use(tokenPath);
app.use(mockRouter);

app.use(errorMiddleware);

app.listen(appConfig.port, () =>
  console.log(`Server is running on http://localhost:${appConfig.port}`)
);

export { app };
