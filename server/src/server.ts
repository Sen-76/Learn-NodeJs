import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import controller from './routes';
import { connectDB } from './config/connections/mongo-connection';
// import InitialData from './config/initial-data';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());

connectDB();
// InitialData();

app.use(express.json());

controller(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
