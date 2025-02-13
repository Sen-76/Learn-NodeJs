import mongoose from 'mongoose';
import { queryDataGrid } from './commonService';
import { DataGridOptions } from '@common/models/common';
import { commentSchema } from '../models/comment';

// Create the Mongoose model
const CommentModel = mongoose.model('Comment', commentSchema);

export async function getComments() {
  try {
    const options: DataGridOptions = {
      page: 1,
      pageSize: 5,
      search: 'Mercedes Tyler',
      searchFields: ['name', 'email'],
      sort: { name: 1 },
    };

    const results = await queryDataGrid(CommentModel, options);
    return results;
  } catch (err) {
    console.error('Error querying the database:', err);
  }
}
