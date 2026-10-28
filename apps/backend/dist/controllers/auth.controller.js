"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemOtr = exports.login = exports.inMemoryStore = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_middleware_js_1 = require("../middleware/error.middleware.js");
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-school-key-change-in-production';
// Mock DB store for portable demonstration without live postgres
exports.inMemoryStore = {
    institutions: [
        {
            id: 'inst-001',
            slug: 'stmarys',
            name: "St. Mary's High School",
            contactEmail: "admin@stmarys.edu",
            contactPhone: "+1234567890",
            address: "123 Education Lane"
        }
    ],
    users: [
        {
            id: 'user-admin',
            institutionId: 'inst-001',
            email: 'admin@stmarys.edu',
            phoneNumber: '+19998887771',
            passwordHash: bcryptjs_1.default.hashSync('Admin123!', 10),
            role: 'SUPER_ADMIN',
            isActive: true
        },
        {
            id: 'user-teacher',
            institutionId: 'inst-001',
            email: 'teacher@stmarys.edu',
            phoneNumber: '+19998887772',
            passwordHash: bcryptjs_1.default.hashSync('Teacher123!', 10),
            role: 'TEACHER',
            isActive: true
        },
        {
            id: 'user-parent',
            institutionId: 'inst-001',
            email: 'parent@stmarys.edu',
            phoneNumber: '+19998887773',
            passwordHash: bcryptjs_1.default.hashSync('Parent123!', 10),
            role: 'PARENT',
            isActive: true
        }
    ],
    onboardingTokens: [
        {
            id: 'otr-001',
            institutionId: 'inst-001',
            studentId: 'stud-001',
            guardianId: 'guard-001',
            otrCode: 'OTR-9824-X7K2',
            secretToken: 'sec_7f9a8b1c2d3e4f5a6b7c8d9e0f1a2b3c',
            isRedeemed: false,
            expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000)
        }
    ],
    students: [
        {
            id: 'stud-001',
            institutionId: 'inst-001',
            guardianId: 'guard-001',
            admissionNumber: 'SMS-2025-0142',
            firstName: 'Aarav',
            middleName: 'Kumar',
            lastName: 'Patel',
            dob: '2018-05-14',
            gender: 'MALE',
            nationalId: '9876-5432-1098',
            bloodGroup: 'O+',
            className: 'Class 2-B',
            rollNumber: 24,
            status: 'ACTIVE'
        }
    ],
    attendance: [
        {
            id: 'att-1',
            studentId: 'stud-001',
            date: '2025-05-12',
            status: 'PRESENT',
            remarks: 'On time'
        }
    ],
    marks: [
        {
            id: 'mark-1',
            studentId: 'stud-001',
            subject: 'Mathematics',
            term: 'Term 1 Mid-Term',
            theory: 75.0,
            practical: 18.0,
            grade: 'A1',
            absent: false,
            remarks: 'Good performance'
        }
    ],
    invoices: [
        {
            id: 'inv-1',
            studentId: 'stud-001',
            invoiceNumber: 'INV-2025-001',
            dueDate: '2025-06-01',
            subtotal: 500.0,
            concession: 50.0,
            lateFine: 0.0,
            totalAmount: 450.0,
            paidAmount: 450.0,
            status: 'PAID'
        }
    ]
};
const login = async (req, res, next) => {
    try {
        const { email, phoneNumber, password } = req.body;
        if (!password || (!email && !phoneNumber)) {
            throw new error_middleware_js_1.AppError('Email/phone and password are required', 400, 'INVALID_INPUT');
        }
        const user = exports.inMemoryStore.users.find(u => (email && u.email === email) || (phoneNumber && u.phoneNumber === phoneNumber));
        if (!user || !bcryptjs_1.default.compareSync(password, user.passwordHash)) {
            throw new error_middleware_js_1.AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            institutionId: user.institutionId,
            role: user.role,
            email: user.email,
            phoneNumber: user.phoneNumber
        }, JWT_SECRET, { expiresIn: '24h' });
        const institution = exports.inMemoryStore.institutions.find(i => i.id === user.institutionId);
        return res.json({
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    institution: institution ? { id: institution.id, name: institution.name, slug: institution.slug } : null
                }
            }
        });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
const redeemOtr = async (req, res, next) => {
    try {
        const { secretToken, deviceId, deviceName } = req.body;
        if (!secretToken) {
            throw new error_middleware_js_1.AppError('Secret token is required', 400, 'MISSING_TOKEN');
        }
        const tokenRecord = exports.inMemoryStore.onboardingTokens.find(t => t.secretToken === secretToken);
        if (!tokenRecord || tokenRecord.isRedeemed || tokenRecord.expiresAt < new Date()) {
            throw new error_middleware_js_1.AppError('This registration token has already been redeemed or has expired. Please contact the school office to request a new access link.', 401, 'TOKEN_EXPIRED_OR_INVALID');
        }
        tokenRecord.isRedeemed = true;
        const student = exports.inMemoryStore.students.find(s => s.id === tokenRecord.studentId);
        const institution = exports.inMemoryStore.institutions.find(i => i.id === tokenRecord.institutionId);
        const accessToken = jsonwebtoken_1.default.sign({
            id: student?.id,
            institutionId: tokenRecord.institutionId,
            role: 'PARENT',
            studentId: student?.id
        }, JWT_SECRET, { expiresIn: '365d' });
        return res.json({
            success: true,
            data: {
                tokens: {
                    access_token: accessToken,
                    refresh_token: `ref_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
                },
                institution: {
                    id: institution?.id,
                    name: institution?.name,
                    slug: institution?.slug
                },
                profile: {
                    student_id: student?.id,
                    student_name: `${student?.firstName} ${student?.lastName}`,
                    admission_number: student?.admissionNumber,
                    class_name: student?.className,
                    roll_number: student?.rollNumber
                }
            }
        });
    }
    catch (err) {
        next(err);
    }
};
exports.redeemOtr = redeemOtr;
//# sourceMappingURL=auth.controller.js.map