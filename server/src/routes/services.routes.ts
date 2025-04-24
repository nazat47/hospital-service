import { Router } from "express";
import { getServices } from "../controllers/services.controller";

const router = Router();

router.get("/:hospitalId", getServices);

export default router