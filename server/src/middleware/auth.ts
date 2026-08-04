import { Request, Response, NextFunction } from 'express';
export const auth = (roles: string[] = []) => (req: Request, res: Response, next: NextFunction) => {
    // auth mock
    next();
};
