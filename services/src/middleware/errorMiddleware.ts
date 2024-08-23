import { NextFunction, Request, Response } from "express";
import {
  DuplicateError,
  InvalidCredentials,
  MissingParamError,
  NotFoundError,
} from "../utils/errors";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error Middleware", err.message);
  if (err instanceof MissingParamError) {
    const errorStatus = err.status;
    const errMsg = err.message;
    res.status(errorStatus).json({
      succes: false,
      status: errorStatus,
      message: errMsg,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
  } else if (err instanceof NotFoundError) {
    const errorStatus = err.status;
    const errMsg = err.message;
    res.status(errorStatus).json({
      succes: false,
      status: errorStatus,
      message: errMsg,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
  } else if (err instanceof InvalidCredentials) {
    const errorStatus = err.status;
    const errMsg = err.message;
    res.status(errorStatus).json({
      succes: false,
      status: errorStatus,
      message: errMsg,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
  } else if (err instanceof DuplicateError) {
    const errorStatus = err.status;
    const errMsg = err.message;
    res.status(errorStatus).json({
      succes: false,
      status: errorStatus,
      message: errMsg,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
  } else if (err instanceof Error) {
    const errorStatus = 400;
    const errMsg = err.message;
    res.status(errorStatus).json({
      succes: false,
      status: errorStatus,
      message: errMsg,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
  } else {
    res.status(500).json({
      success: false,
      status: 500,
      message: "An unexpected error occurred",
    });
  }
};

export { errorMiddleware };
