import { RedisCache } from '@/utils/RedisCache';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        name: string;
        email: string;
      };
    }
  }
}

const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'Access denied. No token provided.' });
      return;
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { userId: string; name: string; email: string };
    const redisToken = await RedisCache.get(`user:${decoded.userId}`);
    if (!redisToken || redisToken !== token) {
      res.status(401).send({ error: 'Invalid or expired token' });
      return;
    }
    req.user = decoded; // Lưu thông tin người dùng vào req.user
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

export default authenticateJWT;
