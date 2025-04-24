import jwt, { JwtPayload } from "jsonwebtoken";
import { Response } from "express";

type TokenUser = {
  userId: string;
};

export interface TokenPayload {
  userId: string;
}

export const createToken = (payload: TokenUser) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};

export const validateToken = (token: string): TokenPayload | null => {
  return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
};

export const attachCookies = ({
  token,
  res,
}: {
  token: string;
  res: Response;
}) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? `none` : "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000 * 30,
  });
};
