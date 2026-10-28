"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_js_1 = require("../controllers/student.controller.js");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_js_1.authenticateToken, student_controller_js_1.getStudents);
router.post('/', auth_middleware_js_1.authenticateToken, (0, auth_middleware_js_1.requireRoles)('SUPER_ADMIN', 'PRINCIPAL', 'OFFICE_STAFF'), student_controller_js_1.createStudent);
router.get('/:id', auth_middleware_js_1.authenticateToken, student_controller_js_1.getStudentById);
exports.default = router;
//# sourceMappingURL=student.routes.js.map