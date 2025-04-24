import { Response } from "express";
import { db } from "../db/db";
import { BadRequestError } from "../errors";
import { ExtendedRequest } from "../middlewares/authenticate";

export const createAppointment = async (
  req: ExtendedRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.userId;
  const { serviceId } = req.params;

  if (!userId || !serviceId) {
    throw new BadRequestError("user or service not found");
  }
  const appointment = await db.appointment.create({
    data: {
      userId,
      serviceId,
      date: new Date(),
    },
  });

  if (!appointment) {
    throw new BadRequestError("Failed to book appointment");
  }

  res.status(201).json(appointment);
};
