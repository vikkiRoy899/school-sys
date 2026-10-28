import { Router } from 'express';
import { recordHomeroomAttendance, getAttendance } from '../controllers/attendance.controller.js';
import { authenticateToken, requireRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/record-homeroom', authenticateToken, requireRoles('TEACHER', 'PRINCIPAL', 'SUPER_ADMIN'), recordHomeroomAttendance);
router.get('/', authenticateToken, getAttendance);

export default router;