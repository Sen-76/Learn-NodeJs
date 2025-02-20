import { cn } from '@/helpers/util';

const Checkbox = (props: A) => {
  const { id, label, className, ...rest } = props;

  return (
    <div className="flex items-center cursor-pointer">
      <input
        id={id}
        name={id}
        type="checkbox"
        className={cn(
          'h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer',
          className
        )}
        {...rest}
      />
      <label htmlFor={id} className="ml-1 block text-sm text-gray-900 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
