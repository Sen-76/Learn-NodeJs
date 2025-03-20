import { Document, Schema, Types } from 'mongoose';

// Define the interface for the document
export interface IComment extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  movie_id: Types.ObjectId;
  text: string;
  date?: Date;
}

// Define the schema
export const commentSchema = new Schema<IComment>({
  _id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId(), required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  movie_id: { type: Schema.Types.ObjectId, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true },
});
