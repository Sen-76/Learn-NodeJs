import { Request, Response, NextFunction } from 'express';
import { RedisCache } from '@/utils/RedisCache';

export function cacheMiddleware(prefix: string, ttl: number) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cacheKey = RedisCache.generateKey(prefix, req.body);
      const cachedData = await RedisCache.get(cacheKey);

      if (cachedData) {
        console.log('Serving from cache');
        res.json(cachedData);
        return;
      } else {
        console.log('Cache miss, proceeding to route handler...');
        res.locals.cacheKey = cacheKey;
        res.locals.ttl = ttl;
        next();
      }
    } catch (err) {
      next(err);
    }
  };
}
