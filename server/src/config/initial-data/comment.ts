import { commentSchema, IComment } from '@/models/comment';
import mongoose from 'mongoose';
import { Types } from 'mongoose';

const InitComment = async () => {
  const Comment = mongoose.model<IComment>('Comment', commentSchema);

  const commentData: Partial<IComment> = {
    _id: new Types.ObjectId('5a9427648b0beebeb69582cc'),
    name: 'Mercedes Tyler',
    email: 'mercedes_tyler@fakegmail.com',
    movie_id: new Types.ObjectId('573a1393f29313caabcdbe7c'),
    text: 'Fuga nihil dolor veniam repudiandae. Rem debitis ex porro dolorem maxime laborum. Esse molestias accusamus provident unde. Sint cupiditate cumque corporis nulla explicabo fuga.',
    date: new Date('2011-03-01T12:06:42.000Z'),
  };

  const comment = new Comment(commentData);

  try {
    await comment.save();
    console.log('Comment saved successfully!');
  } catch (err) {
    console.error('Error saving comment:', err);
  }
};

export default InitComment;
