import { Request, Response, NextFunction } from 'express';
import { inMemoryStore } from './auth.controller.js';
import { AppError } from '../middleware/error.middleware.js';

export const recordMarks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { exam_term_id, class_subject_id, marks_entries } = req.body;

    if (!Array.isArray(marks_entries)) {
      throw new AppError('Marks entries must be an array', 400);
    }

    let updatedRecords = 0;

    marks_entries.forEach((entry: any) => {
      const existingMark = inMemoryStore.marks.find(m => 
        m.studentId === entry.enrollment_id && 
        m.term === 'Term 1 Mid-Term'
      );

      if (existingMark) {
        existingMark.theory = entry.theory_marks_obtained;
        existingMark.practical = entry.practical_marks_obtained;
        existingMark.absent = entry.is_absent;
        existingMark.remarks = entry.remarks;
        updatedRecords++;
      } else {
        inMemoryStore.marks.push({
          id: `mark-${Date.now()}-${Math.random()}`,
          studentId: entry.enrollment_id,
          subject: 'Mathematics',
          term: 'Term 1 Mid-Term',
          theory: entry.theory_marks_obtained,
          practical: entry.practical_marks_obtained,
          grade: entry.theory_marks_obtained >= 75 ? 'A1' : 'B1',
          absent: entry.is_absent,
          remarks: entry.remarks
        });
        updatedRecords++;
      }
    });

    res.json({
      success: true,
      message: 'Marks records successfully updated.',
      updated_records: updatedRecords
    });
  } catch (err) {
    next(err);
  }
};

export const getMarks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.query;
    let marks = [...inMemoryStore.marks];

    if (studentId) {
      marks = marks.filter(m => m.studentId === studentId);
    }

    res.json({
      success: true,
      data: marks
    });
  } catch (err) {
    next(err);
  }
};