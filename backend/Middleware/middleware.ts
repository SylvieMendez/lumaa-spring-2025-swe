import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        res.status(401).json({ message: 'Access denied' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};