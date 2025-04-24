"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound = void 0;
const routeNotFound = (req, res, next) => {
    res.status(404).send("Route not found");
};
exports.routeNotFound = routeNotFound;
