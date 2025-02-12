import express, { Request, Response } from 'express';
import cors from 'cors';
// import { initDatabase } from './mssql-connection';
import { client } from './mongo-connection';
import { getComments } from './services/comments';

const app = express();
const port = 3000;

// initDatabase();
client.connect();

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.get('/api', (req, res) => {
  res.json(['userOne', 'userTwo', 'userThree']);
});

app.get('/testmongo', async (req, res) => {
  try {
    const results = await getComments();
    res.json(results);
  } catch (err) {
    console.error('Error in /testmongo:', err);
    res.status(500).json({ error: 'Failed to query database' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
