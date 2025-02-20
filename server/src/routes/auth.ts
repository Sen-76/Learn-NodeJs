import express, { Request, Response } from 'express';
import { Auth } from '@/services/authService';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const result = await Auth.Login(req.body);

    // Set the cookie before sending the response
    res.cookie('token', result.data, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
      sameSite: 'strict',
    });

    // Send the response once
    res.status(result.statusCode).json({
      token: result.data,
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
    res.status(500).json({ error: err.message || 'Failed to process login request' });
  }
});

router.post('/forgot', async (req: Request, res: Response) => {
  try {
    const result = await Auth.FogotPassword(req.body);
    res.status(result.statusCode).json({
      token: result.data,
      error: result.error,
    });
  } catch (err: any) {
    console.error('Error in registration:', err);
    res.status(500).json({ error: err.message || 'Failed to process login request' });
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
    res.status(500).json({ error: err.message || 'Failed to process login request' });
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
    res.status(500).json({ error: err.message || 'Failed to process login request' });
  }
});

export default router;
