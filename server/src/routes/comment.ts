import { Request, Response } from 'express';
import express from 'express';
import { getComments, createComment } from '../services/commentService';
import authenticateJWT from '@/middlewares/authenticateJWT';
import { cacheMiddleware } from '@/middlewares/redisMiddleware';
import { RedisCache } from '@/utils/RedisCache';

const router = express.Router();

router.post('/querydatagrid', cacheMiddleware('comments', 3600), authenticateJWT, async (req: Request, res: Response) => {
  try {
    const results = await getComments(req.body);
    if (res.locals.cacheKey) await RedisCache.set(res.locals.cacheKey, results, res.locals.ttl);
    res.json(results);
  } catch (err) {
    console.error('Error in querydatagrid:', err);
    res.status(500).json({ error: 'Failed to query database' });
  }
});

router.post('/create', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const results = await createComment(req.body);
    res.json(results);
  } catch (err) {
    console.error('Error in querydatagrid:', err);
    res.status(500).json({ error: 'Failed to query database' });
  }
});

export default router;
