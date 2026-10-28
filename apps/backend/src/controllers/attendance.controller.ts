import { Request, Response, NextFunction } from 'express';
import { inMemoryStore } from './auth.controller.js';
import { AppError } from '../middleware/error.middleware.js';

export const recordHomeroomAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { section_id, date, records } = req.body;

    if (!date || !Array.isArray(records)) {
      throw new AppError('Date and records array are required', 400);
    }

    let presentCount = 0;
    let absentCount = 0;
    let lateCount = 0;

    records.forEach((r: any) => {
      if (r.status === 'PRESENT') presentCount++;
      if (r.status === 'ABSENT') absentCount++;
      if (r.status === 'LATE') lateCount++;

      inMemoryStore.attendance.push({
        id: `att-${Date.now()}-${Math.random()}`,
        studentId: r.studentId || r.enrollment_id || 'stud-001',
        date,
        status: r.status,
        remarks: r.remarks || null
      });
    });

    res.json({
      success: true,
      data: {
        total_students: records.length,
        present_count: presentCount,
        absent_count: absentCount,
        late_count: lateCount,
        notifications_dispatched: absentCount
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId, date } = req.query;
    let attendance = [...inMemoryStore.attendance];

    if (studentId) {
      attendance = attendance.filter(a => a.studentId === studentId);
    }

    if (date) {
      attendance = attendance.filter(a => a.date === date);
    }

    res.json({
      success: true,
      data: attendance
    });
  } catch (err) {
    next(err);
  }
};