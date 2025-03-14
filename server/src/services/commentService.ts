import mongoose from 'mongoose';
import { createDataGrid, queryDataGrid, updateDataGrid } from './commonService';
import { DataGridOptions } from '@common/models/common';
import { commentSchema, IComment } from '../models/comment';

// Create the Mongoose model
const CommentModel = mongoose.model('Comment', commentSchema);

export async function getComments(options: DataGridOptions) {
  try {
    return await queryDataGrid(CommentModel, options);
  } catch (err) {
    console.error('Error querying the database:', err);
    throw err;
  }
}

export async function createComment(model: IComment) {
  try {
    return await createDataGrid(CommentModel, model);
  } catch (err) {
    console.error('Error querying the database:', err);
    throw err;
  }
}

export async function updateCommentById(commentId: string, updateData: Partial<IComment>) {
  try {
    const query = { _id: commentId };
    const options = { multi: false };

    return await updateDataGrid(CommentModel, query, updateData, options);
  } catch (err) {
    console.error('Error updating the comment:', err);
    throw err;
  }
}

export async function updateComments(query: any, updateData: Partial<IComment>) {
  const options = { multi: true };

  try {
    return await updateDataGrid(CommentModel, query, updateData, options);
  } catch (err) {
    console.error('Failed to update comments:', err);
    throw err;
  }
}
