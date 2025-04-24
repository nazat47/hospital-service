import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  statusCode?: number;
  code?: string | number;
  keyValue?: { [key: string]: string };
  value?: string;
  status?: number;
  errors?: { [key: string]: { message: string } };
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let customError = {
    message: err.message || "Something went wrong",
    statusCode: err.statusCode || 500,
  };

  if (err.name === "ValidationError") {
    if (err.errors) {
      customError.message = Object.values(err.errors)
        .map((item) => item.message)
        .join(",");
      customError.statusCode = 400;
    }
  }
  if (err.code && err.code === 11000 && err.keyValue) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.message = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    customError.message = "Invalid JSON syntax";
    customError.statusCode = 400;
  }

  res.status(customError.statusCode).json({ message: customError.message });
};
