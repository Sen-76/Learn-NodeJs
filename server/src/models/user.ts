import { Document, Schema, Types } from 'mongoose';

// Define the User interface
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  verificationCode: string;
  verificationCodeExpiry: Date;
}

// Define the Mongoose schema
export const userSchema = new Schema<IUser>({
  _id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId(), required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationCode: { type: String },
  verificationCodeExpiry: { type: Date },
});
