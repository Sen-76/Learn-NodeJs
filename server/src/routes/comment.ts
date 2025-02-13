import { Request, Response } from 'express';
import express from 'express';
import { getComments } from '../services/commentService';

const router = express.Router();

// Use router.get instead of router.use
router.get('/querydatagrid', async (req: Request, res: Response) => {
  try {
    const results = await getComments();
    res.json(results);
  } catch (err) {
    console.error('Error in querydatagrid:', err);
    res.status(500).json({ error: 'Failed to query database' });
  }
});

export default router;
