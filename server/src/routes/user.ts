import authenticateJWT from '@/middlewares/authenticateJWT';
import express, { Request, Response } from 'express';
import { User } from '@/services/userService';
import multer from 'multer';
import { RedisCache } from '@/utils/RedisCache';
import { cacheMiddleware } from '@/middlewares/redisMiddleware';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/querydatagrid', cacheMiddleware('comments', 3600), authenticateJWT, async (req: Request, res: Response) => {
  try {
    const result = await User.getUsers(req.body);
    if (res.locals.cacheKey) await RedisCache.set(res.locals.cacheKey, result, res.locals.ttl);
    res.status(result.statusCode).json(result.data);
  } catch (err: any) {
    console.error('Error in login:', err);
    res.status(500).json({ error: err.message || 'Failed to process login request' });
  }
});

router.post('/create', authenticateJWT, upload.single('avatar'), async (req: Request, res: Response) => {
  try {
    // console.log(req.file);
    // console.log(req.files);
    if (!req.file) return;
    const img = req.file.buffer;
    const encode_image = img.toString('base64');

    console.log(encode_image);
  } catch (err: any) {
    console.error('Error in login:', err);
    res.status(500).json({ error: err.message || 'Failed to process login request' });
  }
});

export default router;
