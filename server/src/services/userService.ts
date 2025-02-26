import mongoose from 'mongoose';
import { userSchema } from '@/models/user';
import { DataGridOptions } from '@common/models/common';
import { queryDataGrid } from './commonService';

// Create the Mongoose model
const UserModel = mongoose.model('User', userSchema);

export const User = {
  async getUsers(options: DataGridOptions) {
    try {
      const userList = await queryDataGrid(UserModel, options);
      return { statusCode: 200, data: userList };
    } catch (err) {
      console.error('Error querying the database:', err);
      throw err;
    }
  },
};
