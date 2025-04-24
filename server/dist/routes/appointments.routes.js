"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_controller_1 = require("../controllers/appointment.controller");
const authenticate_1 = require("../middlewares/authenticate");
const router = (0, express_1.Router)();
router.post("/:serviceId", authenticate_1.authenticate, appointment_controller_1.createAppointment);
exports.default = router;
