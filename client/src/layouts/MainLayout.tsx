import Notification from './portal-layout/Notification';

const MainLayout = ({ children }: A) => {
  return (
    <div className="w-screen h-screen">
      <div className="w-screen h-screen">{children}</div>
      <Notification />
    </div>
  );
};

export default MainLayout;
