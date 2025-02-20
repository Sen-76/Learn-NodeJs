import express from 'express';
import cors from 'cors';
import { connectDB } from './config/connections/mongo-connection';
import controller from './routes';
// import InitialData from './config/initial-data';

const app = express();
const port = 3000;

connectDB();
// InitialData();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

controller(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
