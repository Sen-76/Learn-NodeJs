import { cn } from '@/helpers/util';
import { Link } from 'react-router-dom';

const CustomLink = (props: A) => {
  const { to, children, className, ...rest } = props;

  return (
    <Link {...rest} to={to} className="group text-blue-400 transition-all duration-100 ease-in-out text-sm">
      <span
        className={cn(
          'bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out',
          className
        )}
      >
        {children}
      </span>
    </Link>
  );
};

export default CustomLink;
