import axiosInstance from '@/services/axios-instance';
import { DataGridOptions } from '@common/models/common';
import { QueryClient } from '@tanstack/react-query';
import CommentForm from './CommentForm';
import { useEffect, useState } from 'react';
import { Richtext } from '@/common/components';

const Comment = () => {
  const queryClient = new QueryClient();
  const [data, setData] = useState<A[]>([]);
  const defaultoptions: DataGridOptions = {
    page: 1,
    pageSize: 5,
    search: 'Sen',
    searchFields: ['name', 'email'],
  };

  useEffect(() => {
    getComment(defaultoptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getComment = async (options: DataGridOptions) => {
    const data = await queryClient.fetchQuery({
      queryKey: ['getcomment', options],
      queryFn: async () => {
        const response = await axiosInstance.post('comments/querydatagrid', options ?? defaultoptions);
        if (response.status !== 200) throw new Error('Network response was not ok');
        return response.data;
      },
    });
    console.log(data);
    setData(data?.results);
  };

  const parseComment = (text: A) => {
    try {
      return JSON.parse(text);
    } catch {
      return {};
    }
  };

  return (
    <div className="p-4">
      <h2>Comments:</h2>
      <CommentForm getComment={getComment} />
      <div className="flex flex-col gap-4">
        {data?.map((comment: A) => (
          <div key={comment._id}>
            <strong>{comment.name}</strong> ({comment.email})
            <div>
              <Richtext readOnly={true} defaultValue={parseComment(comment.text)} />
            </div>
            <em className="float-end text-xs">{new Date(comment.date).toLocaleDateString()}</em>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
