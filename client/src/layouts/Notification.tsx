import XIconSvg from '@/assets/svg/XIconSvg';
import { cn } from '@/helpers/util';
import useLayoutStore, { Notification as INotification } from '@/store/layoutStore';
import { useEffect, useState } from 'react';

const Notification = () => {
  const { notification, setNotification } = useLayoutStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification.open) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        if (notification.onClose) notification.onClose();
        setIsVisible(false);
        setTimeout(() => setNotification({ open: false }), 100);
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification, setNotification]);

  if (!notification.open || !isVisible) return null;

  const getNotificationClass = (type: INotification) => {
    switch (type.type) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'info':
        return 'text-blue-500';
      default:
        return '';
    }
  };

  return (
    <div
      className={cn(
        'fixed top-4 right-4 max-w-xs w-full p-4 bg-white rounded-lg shadow-lg transition-all duration-300 z-50 font-semibold translate-1',
        getNotificationClass(notification),
        {
          'animate-fadeIn': isVisible,
          'animate-fadeOut': !isVisible,
        }
      )}
    >
      <div className="flex justify-between items-center">
        <span>{notification?.message}</span>
        <button onClick={() => setNotification({ open: false })} className="ml-2 cursor-pointer">
          <XIconSvg />
        </button>
      </div>
    </div>
  );
};

export default Notification;
