import { Outlet } from 'react-router-dom';
import LeftNav from './LeftNav';
import Header from './Header';

const AdminLayout = () => {
  return (
    <div className="m-0 font-sans text-base antialiased font-normal dark:bg-slate-900 leading-default bg-gray-50 text-slate-500">
      <div className="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>
      <LeftNav />
      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl overflow-x-hidden">
        <Header />

        <div className="m-6">
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
