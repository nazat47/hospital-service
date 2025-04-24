"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hospitals_controller_1 = require("../controllers/hospitals.controller");
const router = (0, express_1.Router)();
router.get("/", hospitals_controller_1.getHospitals);
exports.default = router;
