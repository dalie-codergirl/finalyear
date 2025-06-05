"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const api_error_1 = require("../errors/api.error");
function errorMiddleware(err, req, res, next) {
    if (err instanceof api_error_1.ApiError) {
        return res.status(err.statusCode).json({
            error: {
                message: err.message,
                details: err.details,
            },
        });
    }
    console.error(err);
    res.status(500).json({
        error: {
            message: 'Internal Server Error',
        },
    });
}
