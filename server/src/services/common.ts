import { Collection, Document } from 'mongodb';
import { DataGridOptions } from '@common/models/common';

export async function queryDataGrid<T extends Document>(collection: Collection<T>, options: DataGridOptions) {
  const { page = 1, pageSize = 10, search = '', searchFields = [], filter = {}, sort = { _id: 1 } } = options;

  // Construct the query
  const query: Record<string, any> = { ...filter };

  // Add search functionality
  if (search && searchFields.length > 0) {
    query.$or = searchFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' }, // Case-insensitive search
    }));
  }

  // Calculate skip value for pagination
  const skip = (page - 1) * pageSize;

  // Fetch data from MongoDB
  const results = await collection.find(query).sort(sort).skip(skip).limit(pageSize).toArray();

  // Get total count of documents (for pagination metadata)
  const totalCount = await collection.countDocuments(query);

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    results,
    pagination: {
      page,
      pageSize,
      totalCount,
      totalPages,
    },
  };
}
