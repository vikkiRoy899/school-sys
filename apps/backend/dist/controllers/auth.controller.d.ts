import { Request, Response, NextFunction } from 'express';
export declare const inMemoryStore: {
    institutions: {
        id: string;
        slug: string;
        name: string;
        contactEmail: string;
        contactPhone: string;
        address: string;
    }[];
    users: {
        id: string;
        institutionId: string;
        email: string;
        phoneNumber: string;
        passwordHash: string;
        role: string;
        isActive: boolean;
    }[];
    onboardingTokens: {
        id: string;
        institutionId: string;
        studentId: string;
        guardianId: string;
        otrCode: string;
        secretToken: string;
        isRedeemed: boolean;
        expiresAt: Date;
    }[];
    students: {
        id: string;
        institutionId: string;
        guardianId: string;
        admissionNumber: string;
        firstName: string;
        middleName: string;
        lastName: string;
        dob: string;
        gender: string;
        nationalId: string;
        bloodGroup: string;
        className: string;
        rollNumber: number;
        status: string;
    }[];
    attendance: {
        id: string;
        studentId: string;
        date: string;
        status: string;
        remarks: string;
    }[];
    marks: {
        id: string;
        studentId: string;
        subject: string;
        term: string;
        theory: number;
        practical: number;
        grade: string;
        absent: boolean;
        remarks: string;
    }[];
    invoices: {
        id: string;
        studentId: string;
        invoiceNumber: string;
        dueDate: string;
        subtotal: number;
        concession: number;
        lateFine: number;
        totalAmount: number;
        paidAmount: number;
        status: string;
    }[];
};
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const redeemOtr: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.controller.d.ts.map