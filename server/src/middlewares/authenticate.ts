import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/index";
import { validateToken } from "../utils/index";
import { TokenPayload } from "../utils/jwt";

export type ExtendedRequest = Request & {
  user?: {
    userId: string;
  };
};

export const authenticate = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token)
      throw new UnauthorizedError("Not authorized to access the route");

    const payload: TokenPayload | null = validateToken(token);
    req.user = {
      userId: payload!.userId,
    };
    next();
  } catch (error) {
    next(error);
  }
};
