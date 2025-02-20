import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI as string;

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, { dbName: 'sample_mflix' }).then(() => console.log('Connected!'));
  } catch (err) {
    console.log('error when connect db: ', err);
  }
};
