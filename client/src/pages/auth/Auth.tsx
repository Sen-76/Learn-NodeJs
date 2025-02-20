import { useEffect, useRef, useState } from 'react';
import GoogleSvg from './GoogleSvg';
import { QueryClient } from '@tanstack/react-query';
import axiosInstance from '@/services/axios-instance';
import { Form, DividerWithText, Link, Checkbox, Button, Input } from '@/common/components';
import useLayoutStore from '@/store/layoutStore';
import { Rule } from '@/common/components/Input';

const Login = () => {
  const [formType, setFormType] = useState<'Login' | 'Regis' | 'Forgot' | 'Verify' | 'Reset'>('Login');
  const { setNotification } = useLayoutStore();
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = new QueryClient();

  const onLogin = async (val: A) => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ['fetchLogin', val],
        queryFn: async () => {
          const response = await axiosInstance.post('auths/login', val);
          if (response.status !== 200) throw new Error('Network response was not ok');
          return response.data;
        },
      });
      console.log(data);
      setNotification({ open: true, message: 'Login Successfully!' });
    } catch (error) {
      console.error('An error occurred while get accounts:', error);
      throw error;
    }
  };

  const onRegis = async (val: A) => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ['fetchRegis', val],
        queryFn: async () => {
          const response = await axiosInstance.post('auths/regis', val);
          if (response.status !== 200) throw new Error('Network response was not ok');
          return response.data;
        },
      });
      console.log(data);
    } catch (error) {
      console.error('An error occurred while get accounts:', error);
      throw error;
    }
  };

  const onForgot = async (val: A) => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ['fetchForgot', val],
        queryFn: async () => {
          const response = await axiosInstance.post('auths/forgot', val);
          if (response.status !== 200) throw new Error('Network response was not ok');
          return response.data;
        },
      });
      setFormType('Verify');
      console.log(data);
    } catch (error) {
      console.error('An error occurred while get accounts:', error);
      throw error;
    }
  };

  const onVerify = async (val: A) => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ['fetchForgot', val],
        queryFn: async () => {
          const response = await axiosInstance.post('auths/verify', val);
          if (response.status !== 200) throw new Error('Network response was not ok');
          return response.data;
        },
      });
      setFormType('Reset');
      console.log(data);
    } catch (error) {
      console.error('An error occurred while get accounts:', error);
      throw error;
    }
  };

  const onReset = async (val: A) => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ['reset', val],
        queryFn: async () => {
          const response = await axiosInstance.post('auths/reset', val);
          if (response.status !== 200) throw new Error('Network response was not ok');
          return response.data;
        },
      });
      setFormType('Login');
      console.log(data);
    } catch (error) {
      console.error('An error occurred while get accounts:', error);
      throw error;
    }
  };

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

  const LoginForm = (
    <>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold">Login</h1>
        <Form
          id="login"
          onFinish={onLogin}
          className="py-8 pb-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
        >
          <Input rules={validationRules.email} id="email" label="Email Address" placeholder="Email" type="text" />
          <Input
            rules={validationRules.password}
            id="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <div className="flex items-center justify-between gap-10">
            <Checkbox id="remember" label="Remember me" />
            <Link to="#" onClick={() => setFormType('Forgot')}>
              Forgot your password?
            </Link>
          </div>
          <Button>Sign In</Button>
        </Form>
      </div>
      <div className="flex flex-col mt-1 items-center justify-center">
        <h3 className="dark:text-gray-300 text-sm">
          Don't have an account?
          <Link to="#" className="ml-1" onClick={() => setFormType('Regis')}>
            Sign Up
          </Link>
        </h3>
      </div>
    </>
  );

  const RegisForm = (
    <>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold">Register</h1>
        <Form
          id="regis"
          onFinish={onRegis}
          className="py-8 pb-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
        >
          <Input rules={validationRules.email} id="email" label="Email Address" placeholder="Email" type="email" />
          <Input
            rules={validationRules.password}
            id="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <Input rules={validationRules.name} id="name" label="Fullname" placeholder="Fullname" type="text" />

          <Button>Sign Up</Button>
        </Form>
      </div>
      <div className="flex flex-col mt-1 items-center justify-center">
        <h3 className="dark:text-gray-300 text-sm">
          Already have an account?
          <Link to="#" className="ml-1" onClick={() => setFormType('Login')}>
            Sign In
          </Link>
        </h3>
      </div>
    </>
  );

  const ForgotPassForm = (
    <>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold">Forgot Password</h1>
        <Form
          id="forgot"
          onFinish={onForgot}
          className="py-8 pb-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
        >
          <Input rules={validationRules.email} id="email" label="Email Address" placeholder="Email" type="email" />

          <Button>Submit</Button>
        </Form>
      </div>
      <div className="flex flex-col mt-1 items-center justify-center">
        <h3 className="dark:text-gray-300 text-sm">
          Already remember account?
          <Link to="#" className="ml-1" onClick={() => setFormType('Login')}>
            Sign In
          </Link>
        </h3>
      </div>
    </>
  );

  const VerifyForm = (
    <>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold">Verification</h1>
        <Form
          id="verify"
          onFinish={onVerify}
          className="py-8 pb-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
        >
          <Input rules={validationRules.email} type="hidden" id="email" label="Email Address" placeholder="Email" />
          <Input rules={validationRules.name} id="verificationCode" label="Code" placeholder="Code" type="text" />

          <Button>Submit</Button>
        </Form>
      </div>
      <div className="flex flex-col mt-1 items-center justify-center">
        <h3 className="dark:text-gray-300 text-sm">
          Already remember account?
          <Link to="#" className="ml-1" onClick={() => setFormType('Login')}>
            Sign In
          </Link>
        </h3>
      </div>
    </>
  );

  const ResetForm = (
    <>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold">Verification</h1>
        <Form
          id="reset"
          onFinish={onReset}
          className="py-8 pb-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
        >
          <Input rules={validationRules.email} type="hidden" id="email" label="Email Address" placeholder="Email" />
          <Input rules={validationRules.name} type="hidden" id="verificationCode" label="Code" placeholder="Code" />
          <Input
            rules={validationRules.password}
            id="newPassword"
            label="New Password"
            placeholder="New Password"
            type="password"
          />
          <Input
            rules={validationRules.password}
            id="reNewPassword"
            label="New Password Again"
            placeholder="New Password"
            type="password"
          />
          <Button>Submit</Button>
        </Form>
      </div>
      <div className="flex flex-col mt-1 items-center justify-center">
        <h3 className="dark:text-gray-300 text-sm">
          Already remember account?
          <Link to="#" className="ml-1" onClick={() => setFormType('Login')}>
            Sign In
          </Link>
        </h3>
      </div>
    </>
  );

  const renderForm = () => {
    switch (formType) {
      case 'Login':
        return LoginForm;
      case 'Regis':
        return RegisForm;
      case 'Forgot':
        return ForgotPassForm;
      case 'Verify':
        return VerifyForm;
      case 'Reset':
        return ResetForm;
      default:
        return LoginForm;
    }
  };

  useEffect(() => {
    if (formRef.current) formRef.current.reset();
  }, [formType]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 w-[420px] sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-6 bg-white shadow-lg sm:rounded-3xl sm:p-16">
          {renderForm()}

          <DividerWithText>Or</DividerWithText>

          <button className="w-full flex justify-center cursor-pointer items-center border border-gray-300 rounded-md shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
            <GoogleSvg />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
