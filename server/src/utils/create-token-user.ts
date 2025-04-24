import { User } from "@prisma/client";

export const createTokenUser = (user: User) => {
  return { userId: user.id as string };
};
