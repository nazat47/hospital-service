"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const index_1 = require("../errors/index");
const index_2 = require("../utils/index");
const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token)
            throw new index_1.UnauthorizedError("Not authorized to access the route");
        const payload = (0, index_2.validateToken)(token);
        req.user = {
            userId: payload.userId,
        };
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authenticate = authenticate;
