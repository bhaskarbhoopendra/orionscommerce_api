"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(error, req, res, next) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    res.status(status).send({ message, status });
}
exports.default = errorHandler;
