import { cn } from '@/helpers/util';
import { useEffect, useState } from 'react';

const Model = ({ open, setIsOpen, children, className }: A) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 bg-black/25 transition-opacity duration-300 overflow-hidden h-screen w-screen z-50',
        open ? 'opacity-100' : 'opacity-0'
      )}
      onClick={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm transition-opacity duration-300 w-screen h-screen"></div>
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div
          className={cn(
            'py-6 flex flex-col justify-center sm:py-12 transform transition-all duration-300',
            open ? 'animate-slideUp opacity-100 scale-100' : 'animate-slideDown opacity-0 scale-95',
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Model;
