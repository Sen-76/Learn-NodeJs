import { connectDB } from '../connections/mongo-connection';
import InitComment from './comment';
import InitUser from './user';

const InitialData = async () => {
  await connectDB();
  console.log('MongoDB connected successfully');
  Promise.all([InitComment(), InitUser()]);
  console.log('Init successfully');
};

export default InitialData;
