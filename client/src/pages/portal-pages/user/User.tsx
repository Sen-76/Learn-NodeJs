import axiosInstance from '@/services/axios-instance';
import { DataGridOptions, DataGridResult } from '@common/models/common';
import { useQuery } from '@tanstack/react-query';
import UserForm from './UserForm';

const fetchUsers = async (options: DataGridOptions) => {
  try {
    const response = await axiosInstance.post<DataGridResult<A>>('users/querydatagrid', options);
    if (response.status !== 200) throw new Error('Network response was not ok');
    return response.data;
  } catch (error) {
    console.error('An error occurred while get accounts:', error);
    throw error;
  }
};
const User = () => {
  const options: DataGridOptions = {
    page: 1,
    pageSize: 5,
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ['fetchUsers', options],
    queryFn: () => fetchUsers(options),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users:</h2>
      {data?.results?.map((comment: A) => (
        <div key={comment._id}>
          <strong>{comment.name}</strong> ({comment.email})
        </div>
      ))}
      <UserForm />
    </div>
  );
};

export default User;
