import { Button, Form, Richtext } from '@/common/components';
import axiosInstance from '@/services/axios-instance';
import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Quill from 'quill';
import { cookie } from '@/helpers/cookie';
import dayjs from 'dayjs';

const CommentForm = ({ getComment }: A) => {
  const Delta = Quill.import('delta');
  const queryClient = new QueryClient();
  const [value, setValue] = useState(new Delta());

  const submitForm = async () => {
    const user: string = cookie.getCookie('user') ?? '';
    try {
      const userParse: A = JSON.parse(user);
      const val = {
        name: userParse?.name,
        email: userParse?.email,
        movie_id: '573a1390f29313caabcd4323',
        text: JSON.stringify(value),
        date: dayjs(),
      };

      const data = await queryClient.fetchQuery({
        queryKey: ['createcomment', val],
        queryFn: async () => {
          const response = await axiosInstance.post('comments/create', val);
          if (response.status !== 200) throw new Error('Network response was not ok');
          return response.data;
        },
      });
      await getComment();
      setValue(new Delta());
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form onFinish={submitForm} className="py-4 text-gray-700">
      <Richtext readOnly={false} defaultValue={value} onTextChange={setValue} />

      <Button className="mt-2">Submit</Button>
    </Form>
  );
};

export default CommentForm;
