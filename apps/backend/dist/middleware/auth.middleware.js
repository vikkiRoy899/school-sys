"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRoles = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_middleware_js_1 = require("./error.middleware.js");
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-school-key-change-in-production';
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return next(new error_middleware_js_1.AppError('Authentication token required', 401, 'UNAUTHORIZED'));
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new error_middleware_js_1.AppError('Invalid or expired authentication token', 403, 'FORBIDDEN'));
        }
        req.user = decoded;
        req.institutionId = decoded.institutionId;
        next();
    });
};
exports.authenticateToken = authenticateToken;
const requireRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new error_middleware_js_1.AppError('Authentication required', 401, 'UNAUTHORIZED'));
        }
        if (!allowedRoles.includes(req.user.role)) {
            return next(new error_middleware_js_1.AppError('Insufficient permissions for this operation', 403, 'INSUFFICIENT_PERMISSIONS'));
        }
        next();
    };
};
exports.requireRoles = requireRoles;
//# sourceMappingURL=auth.middleware.js.map