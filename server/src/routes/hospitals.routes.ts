import { Router } from "express";
import { getHospitals } from "../controllers/hospitals.controller";

const router = Router();

router.get("/", getHospitals);

export default router