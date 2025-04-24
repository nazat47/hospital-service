import { Router } from "express";
import { createAppointment } from "../controllers/appointment.controller";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.post("/:serviceId", authenticate, createAppointment);

export default router