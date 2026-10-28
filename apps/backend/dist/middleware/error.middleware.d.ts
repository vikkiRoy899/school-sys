import { Request, Response, NextFunction } from 'express';
export declare class AppError extends Error {
    statusCode: number;
    errorCode?: string;
    constructor(message: string, statusCode?: number, errorCode?: string);
}
export declare const errorHandler: (err: Error | AppError, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
//# sourceMappingURL=error.middleware.d.ts.map