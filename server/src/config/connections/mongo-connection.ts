import mongoose from 'mongoose';
const uri = 'mongodb+srv://sen76201:RBGhBQ6H90yX7wwa@test.pszki.mongodb.net/?retryWrites=true&w=majority&appName=Test';

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, { dbName: 'sample_mflix' }).then(() => console.log('Connected!'));
  } catch (err) {
    console.log('error when connect db: ', err);
  }
};
