"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppointment = void 0;
const db_1 = require("../db/db");
const errors_1 = require("../errors");
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { serviceId } = req.params;
    if (!userId || !serviceId) {
        throw new errors_1.BadRequestError("user or service not found");
    }
    const appointment = yield db_1.db.appointment.create({
        data: {
            userId,
            serviceId,
            date: new Date(),
        },
    });
    if (!appointment) {
        throw new errors_1.BadRequestError("Failed to book appointment");
    }
    res.status(201).json(appointment);
});
exports.createAppointment = createAppointment;
