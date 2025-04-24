import { Request, Response } from "express";
import { db } from "../db/db";

export const getHospitals = async (
  req: Request,
  res: Response
): Promise<void> => {
  const hospitals = await db.hospital.findMany();
  res.status(200).json(hospitals || []);
};
