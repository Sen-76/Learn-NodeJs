import { connectDB } from '../connections/mongo-connection';
import InitComment from './comment';

const InitialData = async () => {
  await connectDB();
  console.log('MongoDB connected successfully');
  Promise.all([InitComment()]);
  console.log('Init successfully');
};

export default InitialData;
