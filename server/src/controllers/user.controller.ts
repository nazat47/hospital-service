import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { db } from "../db/db";
import { BadRequestError, NotFoundError } from "../errors";
import { createToken, createTokenUser } from "../utils";
import { attachCookies } from "../utils/jwt";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    throw new BadRequestError("email,name and password is required");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!user) {
    throw new BadRequestError("Failed to register user");
  }

  res
    .status(200)
    .json({ success: true, message: "User registered successfully" });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("email and password is required");
  }

  const userExists = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!userExists) {
    throw new NotFoundError("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, userExists.password);

  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid email or password");
  }

  const tokenPayload = createTokenUser(userExists);
  const token = createToken(tokenPayload);
  attachCookies({ res, token });

  res.status(200).json({ success: true, accessToken: token });
};
