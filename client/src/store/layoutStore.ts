import { create } from 'zustand';

export interface Notification {
  message?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
  open: boolean;
}

interface StoreState {
  notification: Notification;
  headerHeight: string;
  setNotification: (notification: Notification) => void;
}

const useLayoutStore = create<StoreState>((set) => ({
  notification: {
    message: 'Success',
    type: 'success',
    duration: 15000,
    open: false,
  },
  setNotification: (noti: Notification) => set((state) => ({ notification: { ...state.notification, ...noti } })),
  headerHeight: '5rem',
}));

export default useLayoutStore;
