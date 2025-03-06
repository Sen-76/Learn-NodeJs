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
          className="mx-auto fixed px-6 lg:px-8 w-screen z-40 backdrop-blur-sm font-semibold bg-gray-600/25"
          style={{ height: headerHeight }}
        >
          <Header />
        </header>
        <main
          className="w-full z-0 h-screen"
          style={{ marginTop: headerHeight, height: `calc(100vh - ${headerHeight})` }}
        >
          <Outlet></Outlet>
        </main>
      </Scrollbar>
    </div>
  );
};

export default HeaderLayout;
