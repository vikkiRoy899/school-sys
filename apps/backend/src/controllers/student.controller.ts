import { Request, Response, NextFunction } from 'express';
import { inMemoryStore } from './auth.controller.js';
import { AppError } from '../middleware/error.middleware.js';

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { className, status, search } = req.query;
    let students = [...inMemoryStore.students];

    if (className) {
      students = students.filter(s => s.className.toLowerCase().includes((className as string).toLowerCase()));
    }

    if (status) {
      students = students.filter(s => s.status === status);
    }

    if (search) {
      const q = (search as string).toLowerCase();
      students = students.filter(s => 
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        s.admissionNumber.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      data: students,
      count: students.length
    });
  } catch (err) {
    next(err);
  }
};

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      firstName, middleName, lastName, dob, gender, nationalId,
      bloodGroup, className, fatherName, fatherPhone, motherName, address
    } = req.body;

    if (!firstName || !lastName || !dob || !gender) {
      throw new AppError('First name, last name, DOB, and gender are required', 400);
    }

    const admissionNumber = `SMS-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    const otrCode = `OTR-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const secretToken = `sec_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

    const newStudent = {
      id: `stud-${Date.now()}`,
      institutionId: req.institutionId || 'inst-001',
      guardianId: `guard-${Date.now()}`,
      admissionNumber,
      firstName,
      middleName: middleName || null,
      lastName,
      dob,
      gender,
      nationalId: nationalId || null,
      bloodGroup: bloodGroup || null,
      className: className || 'Class 1-A',
      rollNumber: inMemoryStore.students.length + 1,
      status: 'ACTIVE'
    };

    inMemoryStore.students.push(newStudent);

    const onboarding = {
      id: `otr-${Date.now()}`,
      institutionId: req.institutionId || 'inst-001',
      studentId: newStudent.id,
      guardianId: newStudent.guardianId,
      otrCode,
      secretToken,
      isRedeemed: false,
      expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000)
    };

    inMemoryStore.onboardingTokens.push(onboarding);

    res.status(201).json({
      success: true,
      data: {
        student_id: newStudent.id,
        admission_number: newStudent.admissionNumber,
        assigned_class: newStudent.className,
        roll_number: newStudent.rollNumber,
        onboarding: {
          otr_code: otrCode,
          secret_token: secretToken,
          deep_link: `https://app.platform.domain.com/connect?endpoint=http%3A%2F%2Flocalhost%3A4000%2Fapi%2Fv1&token=${secretToken}&code=${otrCode}`,
          dispatch_queued: true
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const student = inMemoryStore.students.find(s => s.id === id);

    if (!student) {
      throw new AppError('Student not found', 404);
    }

    res.json({
      success: true,
      data: student
    });
  } catch (err) {
    next(err);
  }
};