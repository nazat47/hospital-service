"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    let customError = {
        message: err.message || "Something went wrong",
        statusCode: err.statusCode || 500,
    };
    if (err.name === "ValidationError") {
        if (err.errors) {
            customError.message = Object.values(err.errors)
                .map((item) => item.message)
                .join(",");
            customError.statusCode = 400;
        }
    }
    if (err.code && err.code === 11000 && err.keyValue) {
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode = 400;
    }
    if (err.name === "CastError") {
        customError.message = `No item found with id : ${err.value}`;
        customError.statusCode = 404;
    }
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        customError.message = "Invalid JSON syntax";
        customError.statusCode = 400;
    }
    res.status(customError.statusCode).json({ message: customError.message });
};
exports.errorHandler = errorHandler;
