import Notification from './Notification';

const MainLayout = ({ children }: A) => {
  return (
    <div className="w-screen h-screen">
      <div className="bg-gray-500/75 w-screen h-screen">{children}</div>
      <Notification />
    </div>
  );
};

export default MainLayout;
