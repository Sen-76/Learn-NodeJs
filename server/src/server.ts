import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import { connectDB } from './config/connections/mongo-connection';
import { socket } from './config/socket/socket';
import cron from 'node-cron';
// import InitialData from './config/initial-data';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//Test Timmer
cron.schedule('* * * * *', () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}`;

  console.log(formattedDate, formattedTime);
  console.log('This will run every minute');
});

cron.schedule('*/30 * * * *', () => {
  console.log('This task runs every 30 minutes');
});

cron.schedule('30 10 * * *', () => {
  console.log('This will run every day at 10:30 AM');
});

socket();

connectDB();
// InitialData();

routes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
