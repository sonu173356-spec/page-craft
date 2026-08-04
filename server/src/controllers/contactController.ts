import { Request, Response, NextFunction } from 'express';
export const contactController = {
    getAll: (req: Request, res: Response) => res.json({ message: 'get all' }),
    getById: (req: Request, res: Response) => res.json({ message: 'get by id' }),
    create: (req: Request, res: Response) => res.json({ message: 'create' }),
    update: (req: Request, res: Response) => res.json({ message: 'update' }),
    delete: (req: Request, res: Response) => res.json({ message: 'delete' }),
};
