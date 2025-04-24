import { Request, Response } from "express";
import { db } from "../db/db";
import { BadRequestError } from "../errors";

export const getServices = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { hospitalId } = req.params;
  if (!hospitalId) {
    throw new BadRequestError("Hospital not found");
  }
  const services = await db.service.findMany({
    where: { hospitalId },
    include: {
      hospital: true,
    },
  });

  res.status(200).json(services || []);
};
