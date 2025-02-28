import { Model, Document } from 'mongoose';
import { DataGridOptions } from '@common/models/common';

export async function queryDataGrid<T extends Document>(model: Model<T>, options: DataGridOptions) {
  const { page = 1, pageSize = 10, search = '', searchFields = [], filter = {}, sort = { _id: 1 } } = options;
  const query: Record<string, any> = { ...filter };

  if (search && searchFields.length > 0) {
    query.$or = searchFields.map((field) => ({
      [field]: search,
    }));
  }

  const skip = (page - 1) * pageSize;
  const results = await model.find(query).sort(sort).skip(skip).limit(pageSize).exec();
  const totalCount = await model.countDocuments(query);
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

export async function createDataGrid<T extends Document>(model: Model<T>, data: Partial<T>) {
  try {
    const newDocument = await model.create(data);
    return newDocument;
  } catch (err) {
    console.error('Error creating document:', err);
    throw err;
  }
}

export async function updateDataGrid<T extends Document>(
  model: Model<T>,
  query: any,
  updateData: Partial<T>,
  options: { upsert?: boolean; multi?: boolean } = {}
) {
  try {
    const updateOptions = { ...options, new: true };

    const updateResult = options.multi
      ? await model.updateMany(query, updateData, updateOptions)
      : await model.updateOne(query, updateData, updateOptions);

    if (!updateResult.matchedCount) throw new Error('No documents matched the query.');

    return updateResult;
  } catch (err) {
    console.error('Error updating documents:', err);
    throw err;
  }
}
