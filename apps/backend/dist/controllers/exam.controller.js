"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarks = exports.recordMarks = void 0;
const auth_controller_js_1 = require("./auth.controller.js");
const error_middleware_js_1 = require("../middleware/error.middleware.js");
const recordMarks = async (req, res, next) => {
    try {
        const { exam_term_id, class_subject_id, marks_entries } = req.body;
        if (!Array.isArray(marks_entries)) {
            throw new error_middleware_js_1.AppError('Marks entries must be an array', 400);
        }
        let updatedRecords = 0;
        marks_entries.forEach((entry) => {
            const existingMark = auth_controller_js_1.inMemoryStore.marks.find(m => m.studentId === entry.enrollment_id &&
                m.term === 'Term 1 Mid-Term');
            if (existingMark) {
                existingMark.theory = entry.theory_marks_obtained;
                existingMark.practical = entry.practical_marks_obtained;
                existingMark.absent = entry.is_absent;
                existingMark.remarks = entry.remarks;
                updatedRecords++;
            }
            else {
                auth_controller_js_1.inMemoryStore.marks.push({
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
    }
    catch (err) {
        next(err);
    }
};
exports.recordMarks = recordMarks;
const getMarks = async (req, res, next) => {
    try {
        const { studentId } = req.query;
        let marks = [...auth_controller_js_1.inMemoryStore.marks];
        if (studentId) {
            marks = marks.filter(m => m.studentId === studentId);
        }
        res.json({
            success: true,
            data: marks
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getMarks = getMarks;
//# sourceMappingURL=exam.controller.js.map