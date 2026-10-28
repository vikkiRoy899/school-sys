import { Router } from 'express';

const router = Router();

router.get('/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      system: 'K-12 School Management System',
      version: '1.0.0',
      status: 'operational',
      features: {
        student_management: true,
        attendance_tracking: true,
        exam_grading: true,
        fee_management: true,
        parent_portal: true,
        teacher_portal: true
      }
    }
  });
});

export default router;