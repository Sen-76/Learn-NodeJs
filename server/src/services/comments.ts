import { client } from '../mongo-connection';
import { queryDataGrid } from './common';
import { DataGridOptions } from '@common/models/common';

export async function getComments() {
  const collection = client.db('sample_mflix').collection('comments');

  try {
    const options: DataGridOptions = {
      page: 1,
      pageSize: 5,
      search: 'Mercedes Tyler',
      searchFields: ['name', 'email'],
      sort: { name: 1 },
    };
    const results = await queryDataGrid(collection, options);
    return results;
  } catch (err) {
    console.error('Error querying the database:', err);
  }
}
