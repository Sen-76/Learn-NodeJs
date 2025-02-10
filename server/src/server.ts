import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
