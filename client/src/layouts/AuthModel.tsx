import { useState } from 'react';
import Auth from './Auth';
import { Model } from '@/common/components';

const AuthModel = ({ noRegis }: A) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState('Login');

  return (
    <>
      <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-2 text-white hover:bg-gray-500 rounded-md px-3 py-2">
        <div className="hidden md:block">
          <button
            className="text-15px font-medium space-links cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setFormType('Login');
            }}
          >
            Sign In
          </button>
        </div>
      </div>
      {!noRegis && (
        <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-2 text-white hover:bg-gray-500 rounded-md px-3 py-2">
          <div className="hidden md:block">
            <button
              className="text-15px font-medium space-links cursor-pointer"
              onClick={() => {
                setIsOpen(true);
                setFormType('Regis');
              }}
            >
              Register
            </button>
          </div>
        </div>
      )}
      <Model open={isOpen} setIsOpen={setIsOpen}>
        <Auth defaultFormType={formType} />
      </Model>
    </>
  );
};

export default AuthModel;
