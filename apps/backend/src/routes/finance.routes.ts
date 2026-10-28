import { Router } from 'express';
import { collectOfflinePayment, getInvoices } from '../controllers/finance.controller.js';
import { authenticateToken, requireRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/payments/collect-offline', authenticateToken, requireRoles('ACCOUNTANT', 'SUPER_ADMIN'), collectOfflinePayment);
router.get('/invoices', authenticateToken, getInvoices);

export default router;