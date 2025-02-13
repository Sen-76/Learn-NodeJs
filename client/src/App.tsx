import { useQuery } from '@tanstack/react-query';
import { DataGridResult } from '@common/models/common';

const fetchComment = async (): Promise<DataGridResult<A>> => {
  const response = await fetch('/comments/querydatagrid');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const App = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: fetchComment,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Comments:</h2>
      {data?.results?.map((comment: A) => (
        <div key={comment._id}>
          <p>
            <strong>{comment.name}</strong> ({comment.email})
          </p>
          <p>{comment.text}</p>
          <p>
            <em>{new Date(comment.date).toLocaleDateString()}</em>
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;

