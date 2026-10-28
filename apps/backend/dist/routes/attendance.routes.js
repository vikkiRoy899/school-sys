"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_controller_js_1 = require("../controllers/attendance.controller.js");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const router = (0, express_1.Router)();
router.post('/record-homeroom', auth_middleware_js_1.authenticateToken, (0, auth_middleware_js_1.requireRoles)('TEACHER', 'PRINCIPAL', 'SUPER_ADMIN'), attendance_controller_js_1.recordHomeroomAttendance);
router.get('/', auth_middleware_js_1.authenticateToken, attendance_controller_js_1.getAttendance);
exports.default = router;
//# sourceMappingURL=attendance.routes.js.map