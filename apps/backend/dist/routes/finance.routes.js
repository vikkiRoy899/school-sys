"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const finance_controller_js_1 = require("../controllers/finance.controller.js");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const router = (0, express_1.Router)();
router.post('/payments/collect-offline', auth_middleware_js_1.authenticateToken, (0, auth_middleware_js_1.requireRoles)('ACCOUNTANT', 'SUPER_ADMIN'), finance_controller_js_1.collectOfflinePayment);
router.get('/invoices', auth_middleware_js_1.authenticateToken, finance_controller_js_1.getInvoices);
exports.default = router;
//# sourceMappingURL=finance.routes.js.map