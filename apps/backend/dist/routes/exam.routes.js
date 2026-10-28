"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exam_controller_js_1 = require("../controllers/exam.controller.js");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const router = (0, express_1.Router)();
router.put('/marks/record', auth_middleware_js_1.authenticateToken, (0, auth_middleware_js_1.requireRoles)('TEACHER', 'SUPER_ADMIN'), exam_controller_js_1.recordMarks);
router.get('/marks', auth_middleware_js_1.authenticateToken, exam_controller_js_1.getMarks);
exports.default = router;
//# sourceMappingURL=exam.routes.js.map