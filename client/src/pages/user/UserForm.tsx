import { Button, Form, Input } from '@/common/components';
import UploadImage from '@/common/components/UploadImage';
import axiosInstance from '@/services/axios-instance';
import { QueryClient } from '@tanstack/react-query';
import { Rule } from '@/common/components/Input';
import { useState } from 'react';

const UserForm = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const queryClient = new QueryClient();

  const validationRules: Record<string, Rule[]> = {
    name: [{ rule: 'required', message: 'Email is required!' }],
    email: [
      { rule: 'required', message: 'Email is required!' },
      { rule: 'email', message: 'Invalid email address!' },
    ],
    password: [
      { rule: 'required', message: 'Password is required!' },
      { rule: 'minLength', value: 6, message: 'Password must be at least 6 characters long' },
    ],
  };

  const handleImagesChange = (images: File[]) => {
    setSelectedImages(images);
  };

  const submitForm = async (val: A) => {
    const formData = new FormData();
    formData.append('name', val.name);
    formData.append('email', val.email);
    formData.append('password', val.password);
    for (const element of selectedImages) {
      formData.append('avatar', element);
    }

    const data = await queryClient.fetchQuery({
      queryKey: ['test', val],
      queryFn: async () => {
        const response = await axiosInstance.post('users/test', formData);
        if (response.status !== 200) throw new Error('Network response was not ok');
        return response.data;
      },
    });
    console.log(selectedImages, val, data);
  };

  return (
    <Form
      onFinish={submitForm}
      className="py-8 pb-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 p-4"
    >
      <Input rules={validationRules.name} id="name" label="Name" placeholder="Name" type="text" />
      <Input rules={validationRules.email} id="email" label="Email Address" placeholder="Email" type="text" />
      <Input rules={validationRules.password} id="password" label="Password" placeholder="Password" type="password" />
      <UploadImage maxFiles={1} handleImagesChange={handleImagesChange} />
      <Button>Submit</Button>
    </Form>
  );
};

export default UserForm;
