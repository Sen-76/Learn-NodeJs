import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import { connectDB } from './config/connections/mongo-connection';
import { socket } from './config/socket/socket';
// import InitialData from './config/initial-data';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

socket();

connectDB();
// InitialData();

routes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
