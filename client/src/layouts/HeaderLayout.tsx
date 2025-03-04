import useLayoutStore from '@/store/layoutStore';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Scrollbar } from 'react-scrollbars-custom';
// import CafeBackground from '@/assets/video/201947-916877801.mp4';

const HeaderLayout = () => {
  const { headerHeight } = useLayoutStore();

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/* <video className="fixed top-0 left-0 w-full h-full object-cover -z-50" autoPlay loop muted>
        <source src={CafeBackground} type="video/mp4" />
      </video> */}
      <Scrollbar style={{ height: '100vh' }} noScrollX>
        <header
          className="mx-auto max-w-7xl fixed px-6 lg:px-8 w-screen z-40 backdrop-blur-sm text-gray-300 font-semibold"
          style={{ height: headerHeight }}
        >
          <Header />
        </header>
        <div className="w-full z-0 h-screen">
          <Outlet></Outlet>
        </div>
      </Scrollbar>
    </div>
  );
};

export default HeaderLayout;
