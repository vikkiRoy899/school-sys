import { Router } from 'express';
import { recordMarks, getMarks } from '../controllers/exam.controller.js';
import { authenticateToken, requireRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.put('/marks/record', authenticateToken, requireRoles('TEACHER', 'SUPER_ADMIN'), recordMarks);
router.get('/marks', authenticateToken, getMarks);

export default router;