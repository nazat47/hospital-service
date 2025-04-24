import { Router } from "express";
import { getServices } from "../controllers/services.controller";
import { loginUser, registerUser } from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
