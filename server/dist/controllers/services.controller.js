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
exports.getServices = void 0;
const db_1 = require("../db/db");
const errors_1 = require("../errors");
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hospitalId } = req.params;
    if (!hospitalId) {
        throw new errors_1.BadRequestError("Hospital not found");
    }
    const services = yield db_1.db.service.findMany({
        where: { hospitalId },
        include: {
            hospital: true,
        },
    });
    res.status(200).json(services || []);
});
exports.getServices = getServices;
