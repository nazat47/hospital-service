"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const appointments_routes_1 = __importDefault(require("./routes/appointments.routes"));
const hospitals_routes_1 = __importDefault(require("./routes/hospitals.routes"));
const services_routes_1 = __importDefault(require("./routes/services.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const error_handler_1 = require("./middlewares/error-handler");
const route_not_found_1 = require("./middlewares/route-not-found");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Hello!");
});
app.use("/api/v1/users", user_routes_1.default);
app.use("/api/v1/hospitals", hospitals_routes_1.default);
app.use("/api/v1/services", services_routes_1.default);
app.use("/api/v1/appointments", appointments_routes_1.default);
app.use(route_not_found_1.routeNotFound);
app.use(error_handler_1.errorHandler);
exports.default = app;
