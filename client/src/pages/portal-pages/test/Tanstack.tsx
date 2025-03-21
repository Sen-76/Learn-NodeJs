import axiosInstance from '@/services/axios-instance';
import { DataGridOptions, DataGridResult } from '@common/models/common';
import { useQuery } from '@tanstack/react-query';

const fetchComments = async (options: DataGridOptions) => {
  try {
    const response = await axiosInstance.post<DataGridResult<A>>('comments/querydatagrid', options);
    if (response.status !== 200) throw new Error('Network response was not ok');
    return response.data;
  } catch (error) {
    console.error('An error occurred while get accounts:', error);
    throw error;
  }
};

const Tanstack = () => {
  const options: DataGridOptions = {
    page: 1,
    pageSize: 5,
    search: 'Mercedes Tyler',
    searchFields: ['name', 'email'],
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ['fetchComments', options],
    queryFn: () => fetchComments(options),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Comments:</h2>
      {data?.results?.map((comment: A) => (
        <div key={comment._id}>
          <strong>{comment.name}</strong> ({comment.email})<p>{comment.text}</p>
          <em>{new Date(comment.date).toLocaleDateString()}</em>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Tanstack;
