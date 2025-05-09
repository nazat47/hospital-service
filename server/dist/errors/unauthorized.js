"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_1 = __importDefault(require("./custom-error"));
class UnauthorizedError extends custom_error_1.default {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}
exports.default = UnauthorizedError;
