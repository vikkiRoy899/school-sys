import { Router } from 'express';
import { getStudents, createStudent, getStudentById } from '../controllers/student.controller.js';
import { authenticateToken, requireRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticateToken, getStudents);
router.post('/', authenticateToken, requireRoles('SUPER_ADMIN', 'PRINCIPAL', 'OFFICE_STAFF'), createStudent);
router.get('/:id', authenticateToken, getStudentById);

export default router;