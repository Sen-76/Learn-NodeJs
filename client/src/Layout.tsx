import Notification from './layouts/Notification';

const Layout = ({ children }: A) => {
  return (
    <div>
      <Notification />
      {children}
    </div>
  );
};

export default Layout;
