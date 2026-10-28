"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    errorCode;
    constructor(message, statusCode = 400, errorCode) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    console.error('Error Stack:', err.stack);
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            error_code: err.errorCode || 'APPLICATION_ERROR',
            message: err.message
        });
    }
    return res.status(500).json({
        success: false,
        error_code: 'INTERNAL_SERVER_ERROR',
        message: err.message || 'An unexpected internal server error occurred'
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map