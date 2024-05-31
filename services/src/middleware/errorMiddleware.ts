import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"
import { DuplicateError, InvalidToken, ValidationError } from "../utils/errors"

const errorMiddlewareAfter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error Middleware", err)
  if (err instanceof ZodError) {
    err = new ValidationError(err.errors)
  } else if (err instanceof ValidationError) {
    err = new InvalidToken()
  } else if (err.code === "23505") {
    err = new DuplicateError("Email")
  }
  const errorStatus = err.statusCode || 500
  const errMsg = err.message || "Something went wrong"
  res.status(errorStatus).json({
    succes: false,
    status: errorStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  })
}

export { errorMiddlewareAfter }
