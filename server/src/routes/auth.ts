import { cacheMiddleware } from '@/middlewares/redisMiddleware';
import { Auth } from '@/services/authService';
import { RedisCache } from '@/utils/RedisCache';
import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const result = await Auth.Login(req.body);

    res.cookie('token', result.data?.token, {
      secure: false,
      maxAge: 60 * 60 * 1000,
    });

    res.cookie('user', JSON.stringify(result.data?.user), {
      secure: false,
      maxAge: 60 * 60 * 1000,
    });

    if (result.data) await RedisCache.set(`user:${result.data.user.id}`, result.data.token, 60 * 60);

    res.status(result.statusCode).json({
      error: result.error,
    });
  } catch (err: any) {
    console.error('Error in login:', err);
    res.status(500).json({ error: err.message || 'Failed to process login request' });
  }
});

router.post('/regis', async (req: Request, res: Response) => {
  try {
    const result = await Auth.Regis(req.body);
    res.status(result.statusCode).json({
      token: result.data,
      error: result.error,
    });
  } catch (err: any) {
    console.error('Error in registration:', err);
    res.status(500).json({ error: err.message || 'Failed to process regis request' });
  }
});

router.post('/forgot', cacheMiddleware('forgot', 3600), async (req: Request, res: Response) => {
  try {
    const result = await Auth.FogotPassword(req.body);
    if (res.locals.cacheKey) await RedisCache.set(res.locals.cacheKey, result, res.locals.ttl);
    res.status(result.statusCode).json({
      error: result.error,
    });
  } catch (err: any) {
    console.error('Error in registration:', err);
    res.status(500).json({ error: err.message || 'Failed to process forgot request' });
  }
});

router.post('/verify', async (req: Request, res: Response) => {
  try {
    const result = await Auth.Verify(req.body);
    res.status(result.statusCode).json({
      token: result.data,
      error: result.error,
    });
  } catch (err: any) {
    console.error('Error in registration:', err);
    res.status(500).json({ error: err.message || 'Failed to process verify request' });
  }
});

router.post('/reset', async (req: Request, res: Response) => {
  try {
    const result = await Auth.ResetPassword(req.body);
    res.status(result.statusCode).json({
      token: result.data,
      error: result.error,
    });
  } catch (err: any) {
    console.error('Error in registration:', err);
    res.status(500).json({ error: err.message || 'Failed to process reset request' });
  }
});

router.post('/google', async (req: Request, res: Response) => {
  try {
    const payload = await Auth.GoogleLogin(req.body);
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT as string);
    res.json(payload);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to process callback google request' });
  }
});

export default router;
