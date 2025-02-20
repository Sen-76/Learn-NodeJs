import { cn } from '@/helpers/util';

const Button = (props: A) => {
  const { children, id, className, ...rest } = props;

  return (
    <button
      id={id}
      type="submit"
      className={cn(
        'cursor-pointer bg-gradient-to-r from-cyan-400 to-sky-500 text-white rounded-md px-6 py-2 w-full font-medium text-sm',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
