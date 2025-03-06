import { cn } from '@/helpers/util';
import { Link } from 'react-router-dom';
import AuthModel from '../AuthModel';
import Audio from './Audio';

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/', current: true },
  { name: 'Information', href: '#information', current: false },
  { name: 'Operators', href: '#operators', current: false },
  { name: 'Gameplay', href: '#gameplay', current: false },
  { name: 'News', href: '#news', current: false },
];
const Header = () => {
  return (
    <div className="relative flex h-full items-center justify-between">
      <div className="flex flex-1 items-center sm:items-stretch sm:justify-start text-white">
        {/* LOGO */}

        <div className="flex flex-shrink-0 items-center">
          <img className="block h-30px w-30px lg:hidden" src={'/assets/logo/Logo.svg'} alt="Courses-Logo" />
          <img className="hidden h-48px w-48px lg:block" src={'/assets/logo/Logo.svg'} alt="Courses-Logo" />
        </div>

        {/* LINKS */}

        <div className="hidden sm:ml-14 md:block">
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  item.current ? ' text-purple' : 'hover:text-purple',
                  'px-3 py-2 text-15px space-links hover:bg-gray-500 rounded-md hover:text-white'
                )}
                aria-current={item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* AUDIO */}

      <Audio />

      {/* SIGNIN DIALOG */}

      <AuthModel />
    </div>
  );
};

export default Header;
