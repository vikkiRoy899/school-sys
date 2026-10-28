import { Request, Response, NextFunction } from 'express';
export interface AuthUser {
    id: string;
    institutionId: string;
    role: string;
    email?: string;
    phoneNumber: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
            institutionId?: string;
        }
    }
}
export declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => void;
export declare const requireRoles: (...allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map